// =====================================================
//  BIBIYAT ATLAS v2 — Full Store JavaScript
//  🗄️ Connected to Neon PostgreSQL via /api/birds
// =====================================================

const API_BASE = 'http://localhost:3001/api';

// ---- DYNAMIC BIRD DATA (populated from DB) ----
let BIRDS = {};       // { id: birdObject }
let BIRD_LIST = [];   // array of bird objects

// ---- STATE ----
let cart = {};         // { id: qty }
let compareList = [];  // max 3

// =====================================================
//  INIT
// =====================================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadBirdsFromAPI();
  setupNav();
  setupSearch();
  setupFilters();
  setupAnimations();
  setupBackTop();
});

// Fetch birds from the backend API and normalize field names
async function loadBirdsFromAPI() {
  try {
    const res  = await fetch(`${API_BASE}/birds`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();

    // Normalize DB snake_case → camelCase expected by the rest of app.js
    BIRDS = {};
    BIRD_LIST = rows.map(b => {
      const bird = {
        id:         b.id,
        name:       b.name,
        type:       b.type,
        price:      b.price,
        oldPrice:   b.old_price,
        discount:   b.discount,
        image:      b.image,
        category:   b.category,
        badge:      b.badge,
        badgeText:  b.badge_text,
        rating:     parseFloat(b.rating),
        reviews:    b.reviews,
        desc:       b.desc_ar,
        specs:      b.specs,
        features:   b.features,
        canSpeak:   b.can_speak,
        difficulty: b.difficulty,
        color:      b.color,
        tags:       b.tags
      };
      BIRDS[b.id] = bird;
      return bird;
    });

    renderBirdsGrid(BIRD_LIST);
    console.log(`✅ Loaded ${BIRD_LIST.length} birds from database`);
  } catch (err) {
    console.warn('⚠️ API offline — falling back to empty grid:', err.message);
    showToast('⚠️ تعذر الاتصال بالخادم');
  }
}

// =====================================================
//  NAVBAR
// =====================================================
function setupNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('solid', window.scrollY > 60);
    document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
    });
  });

  document.getElementById('cartBtn').addEventListener('click', toggleCart);
  document.getElementById('searchToggle').addEventListener('click', toggleSearch);
}

// =====================================================
//  SEARCH
// =====================================================
function setupSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.classList.remove('show'); return; }

    const matches = BIRD_LIST.filter(b =>
      b.name.includes(q) || b.type.includes(q) ||
      b.tags.some(t => t.includes(q)) || b.desc.includes(q)
    );

    if (!matches.length) { results.classList.remove('show'); return; }

    results.innerHTML = matches.map(b => `
      <div class="sres-item" onclick="openProduct('${b.id}');toggleSearch()">
        <img src="${b.image}" alt="${b.name}"/>
        <div>
          <div class="sres-name">${b.name}</div>
          <div class="sres-price">${b.price} درهم</div>
        </div>
      </div>
    `).join('');
    results.classList.add('show');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-bar')) results.classList.remove('show');
  });
}

function toggleSearch() {
  const bar = document.getElementById('searchBar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
  }
}

// =====================================================
//  FILTERS
// =====================================================
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.bird-card').forEach(card => {
        const cats = card.dataset.category.split(',');
        if (filter === 'all' || cats.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// =====================================================
//  RENDER BIRDS GRID
// =====================================================
function renderBirdsGrid(birds) {
  const grid = document.getElementById('birdsGrid');
  grid.innerHTML = birds.map((b, i) => `
    <div class="bird-card animate-card" data-bird="${b.id}" data-category="${b.category.join(',')}" style="--ci:${i}">
      <div class="bc-badge ${b.badge}">${b.badgeText}</div>
      <div class="bc-img-wrap">
        <img src="${b.image}" alt="${b.name}" loading="lazy"/>
        <div class="bc-overlay">
          <button class="bc-quick-btn" onclick="openProduct('${b.id}')">👁️ تفاصيل</button>
          <button class="bc-cart-btn" onclick="addToCart('${b.id}')">🛒 أضف</button>
        </div>
      </div>
      <div class="bc-body">
        <div class="bc-type">${b.type}</div>
        <h3 class="bc-name">${b.name}</h3>
        <p class="bc-desc">${b.desc.slice(0, 85)}...</p>
        <div class="bc-tags">
          ${b.tags.map(t => `<span class="bc-tag">${t}</span>`).join('')}
        </div>
        <div class="bc-rating">
          <span class="stars">⭐ ${b.rating}</span>
          <span class="cnt">(${b.reviews} تقييم)</span>
          <span style="margin-right:auto;background:rgba(201,99,42,.2);color:var(--terra2);padding:.15rem .5rem;border-radius:50px;font-size:.7rem;font-weight:700">-${b.discount}%</span>
        </div>
        <div class="bc-footer">
          <div class="bc-price">
            <span class="bc-old">${b.oldPrice} درهم</span>
            <span class="bc-new">${b.price} <small>درهم</small></span>
          </div>
          <button class="bc-add" onclick="addToCart('${b.id}')">🛒 أضف للسلة</button>
        </div>
      </div>
      <div class="bc-compare">
        <label>
          <input type="checkbox" id="cmp-${b.id}" onchange="toggleCompare('${b.id}',this)"/>
          <span>قارن مع طير آخر</span>
        </label>
      </div>
    </div>
  `).join('');

  // Re-observe new cards
  setupAnimations();
}

// =====================================================
//  CART
// =====================================================
function addToCart(id) {
  const b = BIRDS[id];
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  showToast(`✅ "${b.name}" تضافت للسلة!`);
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
}

function updateCartUI() {
  const total = Object.entries(cart).reduce((s, [id, qty]) => s + BIRDS[id].price * qty, 0);
  const count = Object.values(cart).reduce((s, q) => s + q, 0);

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = total + ' درهم';

  const body = document.getElementById('cartBody');
  if (!count) {
    body.innerHTML = '<div class="cart-empty-msg">السلة فارغة 🐣</div>';
    return;
  }
  body.innerHTML = Object.entries(cart).map(([id, qty]) => {
    const b = BIRDS[id];
    return `
      <div class="cart-item">
        <img class="ci-img" src="${b.image}" alt="${b.name}"/>
        <div class="ci-info">
          <div class="ci-name">${b.name}</div>
          <div class="ci-price">${b.price * qty} درهم</div>
        </div>
        <div class="ci-qty">
          <button onclick="changeQty('${id}',-1)">−</button>
          <span>${qty}</span>
          <button onclick="changeQty('${id}',1)">+</button>
        </div>
        <button class="ci-remove" onclick="removeFromCart('${id}')">🗑</button>
      </div>
    `;
  }).join('');
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('show');
}

async function checkout() {
  const items = Object.entries(cart);
  if (!items.length) { showToast('⚠️ السلة فارغة!'); return; }
  const total = items.reduce((s, [id, qty]) => s + BIRDS[id].price * qty, 0);
  const lines = items.map(([id, qty]) => `${BIRDS[id].name} × ${qty} = ${BIRDS[id].price * qty} درهم`).join('\n');
  const msg = `مرحبا 👋 بغيت نطلب من بيبيات الأطلس:\n\n${lines}\n\nالمجموع: ${total} درهم`;

  // ✅ Save order to Database
  try {
    const orderItems = items.map(([id, qty]) => ({ id, name: BIRDS[id].name, price: BIRDS[id].price, qty }));
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: orderItems, total, whatsapp_msg: msg })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`✅ الطلب تسجل فالـ Database!`);
      // Clear cart
      cart = {};
      updateCartUI();
      // Redirect to Thank You page
      setTimeout(() => {
        window.location.href = 'thankyou.html';
      }, 1000);
    }
  } catch (err) {
    console.warn('⚠️ API unavailable, order not saved to DB:', err.message);
    showToast('وقع شي مشكل، عافاك عاود المحاولة!');
  }
}

// =====================================================
//  COMPARE
// =====================================================
function toggleCompare(id, checkbox) {
  if (checkbox.checked) {
    if (compareList.length >= 3) {
      showToast('⚠️ ما كنقدرش نزيد أكثر من 3 طيور للمقارنة');
      checkbox.checked = false;
      return;
    }
    compareList.push(id);
  } else {
    compareList = compareList.filter(b => b !== id);
  }
  renderCompare();
  if (compareList.length >= 2) {
    document.getElementById('compare').scrollIntoView({behavior:'smooth',block:'start'});
  }
}

function renderCompare() {
  const empty = document.getElementById('compareEmpty');
  const wrap = document.getElementById('compareTableWrap');
  const table = document.getElementById('compareTable');

  if (compareList.length < 2) {
    empty.style.display = 'block';
    wrap.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  wrap.style.display = 'block';

  const birds = compareList.map(id => BIRDS[id]);
  const rows = [
    {label:'الصورة',       vals: birds.map(b=>`<img src="${b.image}" style="width:70px;height:70px;border-radius:10px;object-fit:cover;border:2px solid ${b.color}"/>`), isHTML:true},
    {label:'السعر',        vals: birds.map(b=>`<strong style="color:var(--gold)">${b.price} درهم</strong>`), isHTML:true},
    {label:'الحجم',        vals: birds.map(b=>b.specs['الحجم'])},
    {label:'العمر الافتراضي',vals: birds.map(b=>b.specs['العمر الافتراضي'])},
    {label:'الغذاء',       vals: birds.map(b=>b.specs['الغذاء'])},
    {label:'الصعوبة',      vals: birds.map(b=>b.difficulty)},
    {label:'يتكلم',        vals: birds.map(b=>b.canSpeak?'<span class="cy">✅ نعم</span>':'<span class="cn">❌ لا</span>'), isHTML:true},
    {label:'التقييم',      vals: birds.map(b=>`⭐ ${b.rating} (${b.reviews})`)},
    {label:'الطلب',        vals: birds.map(b=>`<button class="bc-add" style="font-size:.75rem;padding:.5rem 1rem" onclick="addToCart('${b.id}');showToast('✅ تضاف!')">🛒 أضف</button>`), isHTML:true},
  ];

  table.innerHTML = `
    <thead>
      <tr>
        <th class="lbl">الخاصية</th>
        ${birds.map(b=>`<th style="color:${b.color}">${b.name}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${rows.map(row=>`
        <tr>
          <td class="lbl">${row.label}</td>
          ${row.vals.map(v=>`<td>${v}</td>`).join('')}
        </tr>
      `).join('')}
    </tbody>
  `;
}

// =====================================================
//  PRODUCT MODAL
// =====================================================
function openProduct(id) {
  const b = BIRDS[id];
  const discount = Math.round((1 - b.price / b.oldPrice) * 100);
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img">
        <img src="${b.image}" alt="${b.name}"/>
        <div class="modal-img-badge">${b.badgeText}</div>
      </div>
      <div class="modal-info">
        <div class="modal-type">${b.type}</div>
        <h2 class="modal-name">${b.name}</h2>
        <div class="modal-rating">
          <span style="color:#F4D03F">⭐ ${b.rating}</span>
          <span style="color:var(--muted)">(${b.reviews} تقييم)</span>
        </div>
        <p class="modal-desc">${b.desc}</p>
        <div class="modal-price-row">
          <span class="modal-price">${b.price} <small style="font-size:.9rem">درهم</small></span>
          <span class="modal-old-price">${b.oldPrice} درهم</span>
          <span class="modal-discount">-${discount}%</span>
        </div>
        <div class="modal-specs">
          <h4>📋 المواصفات</h4>
          ${Object.entries(b.specs).map(([k,v])=>`
            <div class="spec-row">
              <span class="spec-key">${k}</span>
              <span class="spec-val">${v}</span>
            </div>
          `).join('')}
        </div>
        <div class="modal-feats">
          ${b.features.map(f=>`<span class="modal-feat yes">${f}</span>`).join('')}
          ${b.canSpeak ? '<span class="modal-feat yes">🗣️ يتكلم</span>' : ''}
          <span class="modal-feat">🎯 الصعوبة: ${b.difficulty}</span>
        </div>
        <div class="modal-actions">
          <button class="modal-btn-add" onclick="addToCart('${b.id}');closeProduct()">
            🛒 أضف للسلة — ${b.price} درهم
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProduct() {
  document.getElementById('modalBg').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProduct(); });

// =====================================================
//  CTA SIGNUP
// =====================================================
async function ctaSignup() {
  const phone = document.getElementById('ctaPhone').value.trim();
  if (!phone) { showToast('⚠️ أدخل رقم واتساب ديالك'); return; }

  // ✅ Save lead to Database
  try {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, source: 'cta_discount' })
    });
    const data = await res.json();
    if (data.success) {
      console.log(`📱 Lead #${data.lead_id} saved to DB`);
    }
  } catch (err) {
    console.warn('⚠️ API unavailable, lead not saved to DB:', err.message);
    showToast('وقع شي مشكل، عافاك عاود المحاولة!');
    return;
  }

  document.getElementById('ctaPhone').value = '';
  showToast('✅ شكراً! رقمك تسجل بنجاح وغادي نتواصلو معاك 🎁');
}

// =====================================================
//  TOAST
// =====================================================
function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.remove('show'), duration);
}

// =====================================================
//  ANIMATIONS (Intersection Observer)
// =====================================================
function setupAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), (e.target.dataset.ci || 0) * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.animate-card').forEach(card => obs.observe(card));
}

// =====================================================
//  BACK TO TOP
// =====================================================
function setupBackTop() {
  // Already handled in scroll event in setupNav
}
