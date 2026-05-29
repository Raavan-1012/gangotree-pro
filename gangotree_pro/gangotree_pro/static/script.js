/* ============================================================
   GANGOTREE SOCIAL ORGANISATION — script.js
   Full site interactivity
   
   ============================================================ */

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];

  const burst = document.createElement('div');
  burst.classList.add('cursor-glow');

  burst.style.left = touch.clientX + 'px';
  burst.style.top = touch.clientY + 'px';

  document.body.appendChild(burst);

  setTimeout(() => {
    burst.remove();
  }, 500);
});

const glow = document.createElement('div');
glow.classList.add('cursor-glow');
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
/* ─── PAGE NAVIGATION ─────────────────────────────────────── */
function showPage(pageId) {
  // Hide all pages
  document
    .querySelectorAll('.page')
    .forEach((p) => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
  }

  // Update active nav link
  document
    .querySelectorAll('.nav-link')
    .forEach((link) => link.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach((link) => {
    const fn = link.getAttribute('onclick') || '';
    if (fn.includes("'" + pageId + "'")) {
      link.classList.add('active');
    }
  });

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-trigger stat counters when home loads
  if (pageId === 'home') {
    setTimeout(animateStats, 400);
  }
}

/* ─── PROGRAM ACTIVITY PAGE ───────────────────────────────── */
const programData = {
  disabled: {
    title: 'Activities for Disabled & Senior Citizens',
    icon: '♿',
    content: `
      <div class="prog-hero">
        <div>
          <div class="prog-icon-large">♿</div>
          <h2>Activities for Disabled & Senior Citizens</h2>
          <p>Gangotree Social Organisation is deeply committed to the welfare of persons with disabilities and senior citizens across Odisha. Our programs focus on inclusion, dignity, and equal access to social and economic opportunities.</p>
          <p>We work with local communities to identify and register persons with disabilities, facilitate access to government schemes, provide assistive devices, and organise awareness camps on disability rights.</p>
          <p>For senior citizens, we run community support groups, health check-up camps, and facilitate access to pension schemes and welfare programmes under state and central government initiatives.</p>
        </div>
        <div class="prog-sidebar-card">
          <h4>Key Activities</h4>
          <ul>
            <li>Disability registration camps</li>
            <li>Assistive device distribution</li>
            <li>Awareness & rights education</li>
            <li>Senior citizen support groups</li>
            <li>Health screening camps</li>
            <li>Government scheme facilitation</li>
          </ul>
        </div>
      </div>`,
    gallery: [
      {
        src: 'https://gangotree.org/program_activity/21-sports competion among desabled at jajpur.jpg',
        caption: 'Sports for Disabled Children at Jajpur',
      },
      {
        src: 'https://gangotree.org/program_activity/22-WhatsApp Image 2024-01-13 at 9.53.27 AM (1).jpg',
        caption: 'Working for Senior Citizens',
      },
      {
        src: 'https://gangotree.org/program_activity/23-Draqwing competition among disabled children.jpg',
        caption: 'Drawing Competition for Disabled Students',
      },
      {
        src: 'https://gangotree.org/program_activity/28-DSC03676.jpg',
        caption: 'Activities for Disabled',
      },
    ],
  },
  carbon: {
    title: 'Carbon Farming',
    icon: '🌳',
    content: `
      <div class="prog-hero">
        <div>
          <div class="prog-icon-large">🌳</div>
          <h2>Carbon Farming</h2>
          <p>Gangotree's Carbon Farming initiative promotes sustainable land management practices that sequester carbon in soil and biomass, simultaneously improving agricultural productivity and generating additional income for farmers.</p>
          <p>We train farmers in techniques such as Alternate Wetting and Drying (AWD) for paddy cultivation, composting, agroforestry, and organic farming. These practices reduce greenhouse gas emissions and improve soil health over time.</p>
          <p>The programme has demonstrated measurable reductions in water usage, fertiliser costs, and methane emissions while increasing farmer incomes through premium markets and carbon credits.</p>
        </div>
        <div class="prog-sidebar-card">
          <h4>Key Activities</h4>
          <ul>
            <li>AWD paddy technique training</li>
            <li>Composting & organic inputs</li>
            <li>Agroforestry promotion</li>
            <li>Soil carbon measurement</li>
            <li>Carbon credit facilitation</li>
            <li>Farmer field schools</li>
          </ul>
        </div>
      </div>`,
    gallery: [
      {
        src: '/static/carbon-1.jpeg',
        caption: 'Carbon Farming Field Activity',
      },
      { src: '/static/carbon-2.jpeg', caption: 'AWD Pipe Demonstration' },
      { src: '/static/carbon-3.jpeg', caption: 'Carbon Farming Training' },
      {
        src: 'https://gangotree.org/program_activity/14-6-1.jpg',
        caption: 'Carbon Farming Programme',
      },
      {
        src: 'https://gangotree.org/program_activity/19-WhatsApp Image 2024-02-03 at 6.46.51 PM (1) (1).jpg',
        caption: 'AWD Pipe Demonstration by Farmer',
      },
      {
        src: 'https://gangotree.org/program_activity/30-DSC_5186.jpg',
        caption: 'Workshop on Carbon Farming',
      },
      {
        src: 'https://gangotree.org/program_activity/32-DSC_5242.jpg',
        caption: 'Farmers Registration',
      },
      {
        src: 'https://gangotree.org/program_activity/29-DSC_5226.jpg',
        caption: 'Evaluation Visit',
      },
      {
        src: 'https://gangotree.org/program_activity/18-IMG_20230414_093555.jpg',
        caption: 'Geo-tagging of Carbon Farming',
      },
    ],
  },
  trai: {
    title: 'TRAI Category 1',
    icon: '📡',
    content: `
      <div class="prog-hero">
        <div>
          <div class="prog-icon-large">📡</div>
          <h2>TRAI Category 1</h2>
          <p>Gangotree is recognised as a Category 1 organisation by the Telecom Regulatory Authority of India (TRAI). This recognition enables us to participate in consultations, contribute to policy-making, and advocate for digital inclusion of marginalised communities.</p>
          <p>Under this programme, we work to bridge the digital divide in tribal and rural Odisha — facilitating internet access, digital literacy, and awareness about consumer rights in the telecom sector.</p>
          <p>We organise workshops, interface meetings, and grassroots feedback programmes that bring the voices of underserved communities into national telecom policy discussions.</p>
        </div>
        <div class="prog-sidebar-card">
          <h4>Key Activities</h4>
          <ul>
            <li>Digital literacy workshops</li>
            <li>Community internet access</li>
            <li>Telecom consumer rights</li>
            <li>Policy consultation inputs</li>
            <li>Grassroots feedback collection</li>
            <li>Awareness on digital services</li>
          </ul>
        </div>
      </div>`,
    gallery: [
      {
        src: '/static/consumer.jpeg',
        caption: 'Consumer Rights Awareness Programme',
      },
      {
        src: 'https://gangotree.org/program_activity/20-Baliguda-02.jpg',
        caption: 'Telecom Awareness Meeting — Baliguda',
      },
      {
        src: '/static/WhatsApp Image 2026-04-30 at 12.14.31 PM.jpeg',
        caption: 'TRAI Awareness Workshop',
      },
      {
        src: '/static/WhatsApp Image 2026-04-30 at 12.14.32 PM.jpeg',
        caption: 'Digital Literacy Session',
      },
    ],
  },
  textile: {
    title: 'Ministry of Textile, Govt of India',
    icon: '🧵',
    content: `
      <div class="prog-hero">
        <div>
          <div class="prog-icon-large">🧵</div>
          <h2>Ministry of Textile, Govt of India</h2>
          <p>In collaboration with the Ministry of Textile, Government of India, Gangotree implements skill development and livelihood programmes for weavers, artisans, and women in tribal communities of Odisha.</p>
          <p>The programme focuses on reviving traditional handloom and handicraft skills, linking artisans to formal markets, and improving quality standards. We also facilitate registration under government welfare schemes for weavers.</p>
          <p>Through self-help groups and cooperative models, women artisans have gained economic independence, preserving cultural heritage while generating sustainable livelihoods.</p>
        </div>
        <div class="prog-sidebar-card">
          <h4>Key Activities</h4>
          <ul>
            <li>Handloom skill training</li>
            <li>Market linkage support</li>
            <li>Women's SHG formation</li>
            <li>Weaver welfare registration</li>
            <li>Quality & design upgrades</li>
            <li>Artisan exhibitions</li>
          </ul>
        </div>
      </div>`,
    gallery: [
      {
        src: '/static/women-empower.jpeg',
        caption: 'Women Empowerment — Artisan Training',
      },
      {
        src: '/static/women-empower-2.jpeg',
        caption: 'Women Artisans Workshop',
      },
      {
        src: 'https://gangotree.org/program_activity/13-WhatsApp Image 2024-01-08 at 3.58.45 PM.jpg',
        caption: 'Stone Carving Programme',
      },
      {
        src: 'https://gangotree.org/program_activity/34-WhatsApp Image 2024-01-08 at 3.58.44 PM (2).jpg',
        caption: 'Stone Carving Skill Training',
      },
      {
        src: 'https://gangotree.org/program_activity/35-WhatsApp_Image_2024-03-13_at_13.57.25.jpg',
        caption: 'Textile Skill Development',
      },
      {
        src: 'https://gangotree.org/program_activity/36-WhatsApp Image 2024-03-31 at 7.45.15 PM (2).jpg',
        caption: 'Artisan Showcase',
      },
    ],
  },
  nutrition: {
    title: 'Nutrition Programme',
    icon: '🥗',
    content: `
      <div class="prog-hero">
        <div>
          <div class="prog-icon-large">🥗</div>
          <h2>Nutrition Programme</h2>
          <p>Gangotree's Nutrition Programme addresses the persistent problem of malnutrition among children, adolescent girls, and women in tribal and rural communities of Odisha — one of the most nutritionally vulnerable populations in India.</p>
          <p>We conduct community-level nutrition surveillance, promote kitchen gardens, distribute nutritional supplements, and run awareness programmes on balanced diets, breastfeeding, and child feeding practices.</p>
          <p>Working with ASHA workers, Anganwadi centres, and local health authorities, the programme has contributed to improved anthropometric outcomes and greater awareness of nutrition rights among beneficiary families.</p>
        </div>
        <div class="prog-sidebar-card">
          <h4>Key Activities</h4>
          <ul>
            <li>Child nutrition surveys</li>
            <li>Kitchen garden promotion</li>
            <li>Supplement distribution</li>
            <li>Breastfeeding awareness</li>
            <li>ASHA & AWW coordination</li>
            <li>Adolescent girl nutrition</li>
          </ul>
        </div>
      </div>`,
    gallery: [
      {
        src: 'https://gangotree.org/program_activity/11-WhatsApp Image 2024-02-13 at 1.20.04 PM (1).jpg',
        caption: 'Pre-school Nutrition Programme',
      },
      {
        src: 'https://gangotree.org/program_activity/27-milk distribution at kumbharasahi.jpg',
        caption: 'Milk Distribution at Kumbharasahi',
      },
      {
        src: 'https://gangotree.org/program_activity/38-IMG_20230323_131641 (1).jpg',
        caption: 'Nutrition Support Distribution',
      },
      {
        src: 'https://gangotree.org/program_activity/25-RAHAT support ot benificaiary.jpg',
        caption: 'RAHAT Support to Beneficiaries',
      },
      {
        src: 'https://gangotree.org/program_activity/40-WhatsApp Image 2023-03-21 at 10.06.18 PM.jpg',
        caption: 'RAHAT Support to Vulnerable Families',
      },
      {
        src: 'https://gangotree.org/program_activity/41-WhatsApp Image 2024-02-13 at 1.21.56 PM.jpg',
        caption: 'Milk Distribution at Salijanga GP',
      },
    ],
  },
  agriculture: {
    title: 'Agriculture',
    icon: '🌾',
    content: `
      <div class="prog-hero">
        <div>
          <div class="prog-icon-large">🌾</div>
          <h2>Agriculture</h2>
          <p>Gangotree's Agriculture Programme supports smallholder farmers in tribal and rural Odisha with modern, sustainable farming techniques designed to increase productivity, reduce risk, and improve incomes.</p>
          <p>We provide training in System of Rice Intensification (SRI), integrated pest management, soil health management, and crop diversification. Farmer Field Schools enable peer learning and knowledge exchange across villages.</p>
          <p>The programme also facilitates access to credit, quality seeds, government subsidies, and market linkages — building a complete ecosystem of agricultural support for farming communities.</p>
        </div>
        <div class="prog-sidebar-card">
          <h4>Key Activities</h4>
          <ul>
            <li>SRI paddy training</li>
            <li>Farmer Field Schools</li>
            <li>Soil health management</li>
            <li>Crop diversification</li>
            <li>Market & credit linkage</li>
            <li>Seed distribution</li>
          </ul>
        </div>
      </div>`,
    gallery: [
      {
        src: '/static/WhatsApp Image 2026-04-30 at 12.14.31 PM.jpeg',
        caption: 'Farmer Training Session',
      },
      {
        src: '/static/WhatsApp Image 2026-04-30 at 12.14.32 PM.jpeg',
        caption: 'Field Demonstration — Kayan',
      },
      {
        src: 'https://gangotree.org/program_activity/12-WhatsApp Image 2023-11-16 at 4.20.28 PM (2).jpg',
        caption: 'CDP-MLIP Programme',
      },
      {
        src: 'https://gangotree.org/program_activity/16-WhatsApp Image 2023-08-24 at 4.47.00 PM.jpg',
        caption: 'CDP-MLIP Field Activity',
      },
      {
        src: 'https://gangotree.org/program_activity/17-Irrigation points joint visit.jpg',
        caption: 'Joint Visit with Govt Staff — Irrigation',
      },
      {
        src: 'https://gangotree.org/program_activity/44-WhatsApp Image 2023-11-01 at 5.24.39 PM.jpg',
        caption: 'Farmers Meeting under CDP-MLIP',
      },
      {
        src: 'https://gangotree.org/program_activity/43-WhatsApp Image 2024-03-06 at 10.24.52 PM.jpg',
        caption: 'Cooking Competition — Community Event',
      },
      {
        src: 'https://gangotree.org/program_activity/45-WhatsApp Image 2024-03-11 at 3.42.56 PM (1).jpg',
        caption: 'Prize Distribution Ceremony',
      },
      {
        src: 'https://gangotree.org/gallery/8-AWD pipe demonstration by a Farmer at Enaadarei (1).jpg',
        caption: 'AWD Pipe Demonstration at Enaadarei',
      },
    ],
  },
};

/* ─── PROGRAM GALLERY HELPER ──────────────────────────────── */
function buildGallery(images) {
  if (!images || !images.length) return '';
  const items = images
    .map(
      (img) =>
        `<div class="prog-gallery-item" onclick="openProgGalleryImage('${img.src}','${img.caption}')">
      <img src="${img.src}" alt="${img.caption}" loading="lazy">
      <div class="gallery-caption">${img.caption}</div>
    </div>`,
    )
    .join('');
  return `<div class="prog-gallery">
    <h3>📸 Photo Gallery</h3>
    <div class="prog-gallery-grid">${items}</div>
  </div>`;
}

function openProgGalleryImage(src, alt) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showProgram(key) {
  const data = programData[key];
  if (!data) return;

  document.getElementById('programTitle').textContent = data.title;
  const gallery = buildGallery(data.gallery || []);
  document.getElementById('programContent').innerHTML = data.content + gallery;

  showPage('program');
}

/* ─── ABOUT PAGE TABS ─────────────────────────────────────── */
function showTab(tabId) {
  // Hide all tab contents
  document
    .querySelectorAll('.tab-content')
    .forEach((tc) => tc.classList.remove('active'));
  // Deactivate all tab buttons
  document
    .querySelectorAll('.tab-btn')
    .forEach((btn) => btn.classList.remove('active'));

  // Show selected tab
  const tabContent = document.getElementById('tab-' + tabId);
  if (tabContent) tabContent.classList.add('active');

  // Activate matching button
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    if ((btn.getAttribute('onclick') || '').includes("'" + tabId + "'")) {
      btn.classList.add('active');
    }
  });
}

/* ─── HERO SLIDER ─────────────────────────────────────────── */
let currentSlide = 0;
let slideTimer = null;

function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  if (!slides.length || !dotsContainer) return;

  // Create dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  startAutoSlide();
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
  goToSlide(currentSlide + direction);
  restartAutoSlide();
}

function startAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function restartAutoSlide() {
  clearInterval(slideTimer);
  startAutoSlide();
}

/* ─── STAT COUNTER ANIMATION ──────────────────────────────── */
function animateStats() {
  const statEls = document.querySelectorAll('.stat-num');
  statEls.forEach((el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1800;
    const step = target / (duration / 16);

    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current < target) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(update);
  });
}

/* ─── INTERSECTION OBSERVER FOR STATS ────────────────────── */
function setupStatsObserver() {
  const statsBand = document.querySelector('.stats-band');
  if (!statsBand) return;

  let triggered = false;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true;
        animateStats();
      }
    },
    { threshold: 0.4 },
  );

  observer.observe(statsBand);
}

/* ─── PHOTO GALLERY FILTER ────────────────────────────────── */
function filterGallery(category, btn) {
  // Update active button
  document
    .querySelectorAll('.filter-btn')
    .forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide photos
  document.querySelectorAll('.photo-item').forEach((item) => {
    if (category === 'all' || item.classList.contains(category)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

/* ─── LIGHTBOX ────────────────────────────────────────────── */
function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img) return;

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ─── CONTACT FORM ────────────────────────────────────────── */
function submitForm() {
  const inputs = document.querySelectorAll('#page-contact .form-input');
  let valid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      valid = false;
      input.style.borderColor = '#e74c3c';
      setTimeout(() => (input.style.borderColor = ''), 2000);
    }
  });

  if (!valid) {
    return;
  }

  // Clear fields and show success
  inputs.forEach((input) => (input.value = ''));
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  setTimeout(() => (success.style.display = 'none'), 5000);
}

/* ─── DONATE AMOUNT SELECTION ─────────────────────────────── */
let selectedAmount = 0;

function selectAmount(amount, btn) {
  selectedAmount = amount;
  document
    .querySelectorAll('.amount-btn')
    .forEach((b) => b.classList.remove('selected'));
  btn.classList.add('selected');
  // Clear custom amount field
  const customInput = document.getElementById('customAmount');
  if (customInput) customInput.value = '';
}

async function proceedDonate() {
  const customInput = document.getElementById('customAmount');
  const custom = customInput ? parseInt(customInput.value, 10) : 0;
  const amount = custom > 0 ? custom : selectedAmount;

  if (!amount || amount <= 0) {
    alert('Please select or enter donation amount.');
    return;
  }

  try {
    const orderResponse = await fetch('/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount }),
    });

    const order = await orderResponse.json();

    if (!orderResponse.ok) {
      alert(order.error || 'Unable to create Razorpay order.');
      return;
    }

    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: 'Gangotree Social Organisation',
      description: 'Donation',
      order_id: order.order_id,

      handler: async function (response) {
        const verifyResponse = await fetch('/verify-razorpay-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(response),
        });

        const result = await verifyResponse.json();

        const success = document.getElementById('donateSuccess');
        success.style.display = 'block';

        if (result.status === 'success') {
          success.textContent = `✅ Thank you! Your donation of ₹${amount.toLocaleString('en-IN')} was successful.`;
        } else {
          success.textContent =
            '❌ Payment verification failed. Please contact us if amount was deducted.';
        }

        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },

      modal: {
        ondismiss: function () {
          console.log('Razorpay popup closed');
        },
      },

      theme: {
        color: '#2e7d32',
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error(error);
    alert('Something went wrong while opening Razorpay.');
  }
}

/* ─── MOBILE HAMBURGER MENU ───────────────────────────────── */
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('open');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (
    nav &&
    hamburger &&
    !nav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    nav.classList.remove('open');
  }
});

/* ─── NAVBAR SCROLL EFFECT ────────────────────────────────── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  // Show/hide scroll-to-top button
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    scrollTop.classList.toggle('visible', window.scrollY > 400);
  }
});

/* ─── DROPDOWN: CLOSE ON OUTSIDE CLICK (MOBILE) ──────────── */
document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const menu = toggle.nextElementSibling;
      const isOpen = menu.style.opacity === '1';
      // Close all dropdowns
      document.querySelectorAll('.dropdown-menu').forEach((m) => {
        m.style.opacity = '0';
        m.style.visibility = 'hidden';
        m.style.transform = 'translateY(10px)';
      });
      if (!isOpen) {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateY(0)';
      }
    }
  });
});

/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  setupStatsObserver();

  // Ensure home page is shown first
  showPage('home');
});
