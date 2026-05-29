"""
Gangotree Social Organisation — Complete Flask Backend
======================================================
Run:   python app.py
Site:  http://127.0.0.1:5000
Admin: http://127.0.0.1:5000/admin
"""

import os
import sqlite3
import hmac
import hashlib
import razorpay
from dotenv import load_dotenv
from datetime import datetime
from functools import wraps

from flask import (
    Flask, request, render_template, redirect,
    session, flash, url_for, jsonify, g
)
from werkzeug.utils import secure_filename

# ── App setup ─────────────────────────────────────────────────────────────────
load_dotenv()

app = Flask(__name__)
app.secret_key = "gangotree_2024_secret"

BASE_DIR         = os.path.dirname(__file__)
DB_PATH          = os.path.join(BASE_DIR, "contacts.db")
GALLERY_FOLDER   = os.path.join(BASE_DIR, "static", "uploads", "gallery")
ACTIVITY_FOLDER  = os.path.join(BASE_DIR, "static", "uploads", "activities")
ALLOWED_EXT      = {"png", "jpg", "jpeg", "gif", "webp"}

ADMIN_USER = "gangotree.org"
ADMIN_PASS = "Narayan@123"

razorpay_client = razorpay.Client(auth=(
    os.getenv("RAZORPAY_KEY_ID"),
    os.getenv("RAZORPAY_KEY_SECRET")
))

os.makedirs(GALLERY_FOLDER,  exist_ok=True)
os.makedirs(ACTIVITY_FOLDER, exist_ok=True)

# ── DB helpers ─────────────────────────────────────────────────────────────────
def get_db():
    db = getattr(g, "_db", None)
    if db is None:
        db = g._db = sqlite3.connect(DB_PATH)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_db(_):
    db = getattr(g, "_db", None)
    if db:
        db.close()

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.executescript("""
        CREATE TABLE IF NOT EXISTS contacts (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT,
            email      TEXT,
            phone      TEXT,
            message    TEXT,
            created_at TEXT DEFAULT (datetime('now','localtime'))
        );

        CREATE TABLE IF NOT EXISTS gallery (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            image    TEXT,
            title    TEXT
        );

        CREATE TABLE IF NOT EXISTS activities (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            category    TEXT,
            title       TEXT,
            description TEXT,
            image       TEXT
        );
    """)
    conn.commit()
    conn.close()

# ── Auth ───────────────────────────────────────────────────────────────────────
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("logged_in"):
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXT

# ── HOME ───────────────────────────────────────────────────────────────────────
@app.route("/")
def home():
    db = get_db()
    gallery_items = db.execute("SELECT * FROM gallery ORDER BY id DESC").fetchall()
    activities    = db.execute("SELECT * FROM activities ORDER BY id DESC").fetchall()
    return render_template("index.html",
                           gallery_items=gallery_items,
                           activities=activities)

# ── CONTACT FORM ───────────────────────────────────────────────────────────────
@app.route("/contact", methods=["POST"])
def contact():
    name    = (request.form.get("name")    or "").strip()
    email   = (request.form.get("email")   or "").strip()
    phone   = (request.form.get("phone")   or "").strip()
    message = (request.form.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify({"status": "error"}), 400

    db = get_db()
    db.execute(
        "INSERT INTO contacts (name,email,phone,message) VALUES (?,?,?,?)",
        (name, email, phone, message)
    )
    db.commit()
    return jsonify({"status": "ok"}), 200

# ── RAZORPAY PAYMENT ROUTES ───────────────────────────────────────────────────
@app.route("/create-razorpay-order", methods=["POST"])
def create_razorpay_order():
    data = request.get_json()
    amount = int(data.get("amount", 0))

    if amount <= 0:
        return jsonify({"error": "Invalid amount"}), 400

    order = razorpay_client.order.create({
        "amount": amount * 100,
        "currency": "INR",
        "payment_capture": 1
    })

    return jsonify({
        "key": os.getenv("RAZORPAY_KEY_ID"),
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"]
    })

@app.route("/verify-razorpay-payment", methods=["POST"])
def verify_razorpay_payment():
    data = request.get_json()

    razorpay_order_id = data.get("razorpay_order_id")
    razorpay_payment_id = data.get("razorpay_payment_id")
    razorpay_signature = data.get("razorpay_signature")

    if not razorpay_order_id or not razorpay_payment_id or not razorpay_signature:
        return jsonify({"status": "failed", "message": "Missing payment details"}), 400

    message = razorpay_order_id + "|" + razorpay_payment_id

    generated_signature = hmac.new(
        os.getenv("RAZORPAY_KEY_SECRET").encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

    if generated_signature == razorpay_signature:
        return jsonify({"status": "success"})

    return jsonify({"status": "failed"}), 400

# ── API: gallery images for frontend (JSON) ────────────────────────────────────
@app.route("/api/gallery")
def api_gallery():
    db    = get_db()
    rows  = db.execute("SELECT * FROM gallery ORDER BY id DESC").fetchall()
    items = [{"id": r["id"], "category": r["category"],
              "title": r["title"], "image": r["image"]} for r in rows]
    return jsonify(items)

# ── API: activities for frontend (JSON) ────────────────────────────────────────
@app.route("/api/activities")
def api_activities():
    db   = get_db()
    rows = db.execute("SELECT * FROM activities ORDER BY id DESC").fetchall()
    items = [{"id": r["id"], "category": r["category"], "title": r["title"],
               "description": r["description"], "image": r["image"]} for r in rows]
    return jsonify(items)

# ══════════════════════════════════════════════════════════════════════════════
#  ADMIN — LOGIN / LOGOUT
# ══════════════════════════════════════════════════════════════════════════════
@app.route("/login", methods=["GET", "POST"])
def login():
    if session.get("logged_in"):
        return redirect("/admin")
    if request.method == "POST":
        u = (request.form.get("username") or "").strip()
        p = (request.form.get("password") or "").strip()
        if u == ADMIN_USER and p == ADMIN_PASS:
            session["logged_in"] = True
            session["username"]  = u
            return redirect("/admin")
        flash("Invalid username or password.", "error")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")

# ══════════════════════════════════════════════════════════════════════════════
#  ADMIN — DASHBOARD
# ══════════════════════════════════════════════════════════════════════════════
@app.route("/admin")
@login_required
def admin():
    db             = get_db()
    total_contacts = db.execute("SELECT COUNT(*) FROM contacts").fetchone()[0]
    total_gallery  = db.execute("SELECT COUNT(*) FROM gallery").fetchone()[0]
    total_activities = db.execute("SELECT COUNT(*) FROM activities").fetchone()[0]
    recent_contacts = db.execute(
        "SELECT * FROM contacts ORDER BY id DESC LIMIT 5"
    ).fetchall()
    return render_template("admin.html",
                           total_contacts=total_contacts,
                           total_gallery=total_gallery,
                           total_activities=total_activities,
                           recent_contacts=recent_contacts,
                           active="dashboard")

# ══════════════════════════════════════════════════════════════════════════════
#  ADMIN — ENQUIRIES
# ══════════════════════════════════════════════════════════════════════════════
@app.route("/admin/enquiries")
@login_required
def admin_enquiries():
    search = (request.args.get("search") or "").strip()
    db     = get_db()
    if search:
        contacts = db.execute(
            "SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ? OR message LIKE ? ORDER BY id DESC",
            (f"%{search}%", f"%{search}%", f"%{search}%")
        ).fetchall()
    else:
        contacts = db.execute("SELECT * FROM contacts ORDER BY id DESC").fetchall()
    total = db.execute("SELECT COUNT(*) FROM contacts").fetchone()[0]
    return render_template("enquiries.html", contacts=contacts,
                           total=total, search=search, active="enquiries")

@app.route("/admin/enquiries/delete/<int:id>")
@login_required
def delete_enquiry(id):
    db = get_db()
    db.execute("DELETE FROM contacts WHERE id=?", (id,))
    db.commit()
    flash("Enquiry deleted.", "success")
    return redirect("/admin/enquiries")

# ══════════════════════════════════════════════════════════════════════════════
#  ADMIN — PHOTO GALLERY
# ══════════════════════════════════════════════════════════════════════════════
@app.route("/admin/gallery")
@login_required
def admin_gallery():
    db    = get_db()
    items = db.execute("SELECT * FROM gallery ORDER BY id DESC").fetchall()
    total = db.execute("SELECT COUNT(*) FROM gallery").fetchone()[0]
    return render_template("gallery_admin.html", items=items,
                           total=total, active="gallery")

@app.route("/admin/gallery/add", methods=["POST"])
@login_required
def add_gallery():
    category = (request.form.get("category") or "all").strip()
    title    = (request.form.get("title")    or "").strip()
    file     = request.files.get("image")

    if not file or not allowed_file(file.filename):
        flash("Please upload a valid image (jpg, png, gif, webp).", "error")
        return redirect("/admin/gallery")

    filename = secure_filename(file.filename)
    ts       = datetime.now().strftime("%Y%m%d%H%M%S%f")
    filename = f"{ts}_{filename}"
    filepath = os.path.join(GALLERY_FOLDER, filename)
    file.save(filepath)

    db = get_db()
    db.execute(
        "INSERT INTO gallery (category, image, title) VALUES (?,?,?)",
        (category, filename, title)
    )
    db.commit()
    flash("Photo added to gallery.", "success")
    return redirect("/admin/gallery")

@app.route("/admin/gallery/delete/<int:id>")
@login_required
def delete_gallery(id):
    db   = get_db()
    row  = db.execute("SELECT * FROM gallery WHERE id=?", (id,)).fetchone()
    if row:
        img_path = os.path.join(GALLERY_FOLDER, row["image"])
        if os.path.exists(img_path):
            os.remove(img_path)
        db.execute("DELETE FROM gallery WHERE id=?", (id,))
        db.commit()
        flash("Photo deleted.", "success")
    return redirect("/admin/gallery")

# ══════════════════════════════════════════════════════════════════════════════
#  ADMIN — PROGRAM ACTIVITIES
# ══════════════════════════════════════════════════════════════════════════════
@app.route("/admin/activities")
@login_required
def admin_activities():
    db    = get_db()
    items = db.execute("SELECT * FROM activities ORDER BY id DESC").fetchall()
    total = db.execute("SELECT COUNT(*) FROM activities").fetchone()[0]
    return render_template("activities_admin.html", items=items,
                           total=total, active="activities")

@app.route("/admin/activities/add", methods=["POST"])
@login_required
def add_activity():
    category    = (request.form.get("category")    or "").strip()
    title       = (request.form.get("title")       or "").strip()
    description = (request.form.get("description") or "").strip()
    file        = request.files.get("image")

    if not title:
        flash("Title is required.", "error")
        return redirect("/admin/activities")

    filename = None
    if file and allowed_file(file.filename):
        fname    = secure_filename(file.filename)
        ts       = datetime.now().strftime("%Y%m%d%H%M%S%f")
        filename = f"{ts}_{fname}"
        file.save(os.path.join(ACTIVITY_FOLDER, filename))

    db = get_db()
    db.execute(
        "INSERT INTO activities (category,title,description,image) VALUES (?,?,?,?)",
        (category, title, description, filename)
    )
    db.commit()
    flash("Activity added.", "success")
    return redirect("/admin/activities")

@app.route("/admin/activities/delete/<int:id>")
@login_required
def delete_activity(id):
    db  = get_db()
    row = db.execute("SELECT * FROM activities WHERE id=?", (id,)).fetchone()
    if row:
        if row["image"]:
            img_path = os.path.join(ACTIVITY_FOLDER, row["image"])
            if os.path.exists(img_path):
                os.remove(img_path)
        db.execute("DELETE FROM activities WHERE id=?", (id,))
        db.commit()
        flash("Activity deleted.", "success")
    return redirect("/admin/activities")

# ── Run ────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    init_db()
    print("\n" + "="*55)
    print("  🌿 Gangotree Social Organisation")
    print("="*55)
    print("  Website  : http://127.0.0.1:5000")
    print("  Admin    : http://127.0.0.1:5000/admin")
    print("  Login    : gangotree.org / Narayan@123")
    print("="*55 + "\n")
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
