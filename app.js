// ================================================
//  BIBIYAT ATLAS - Bird Store JS
// ================================================

// ---- BIRD DATA ----
const BIRDS = {
  canary: {
    id: 'canary',
    name: 'الكناري الذهبي',
    type: '🎵 كناري غناء',
    price: 120,
    oldPrice: 150,
    image: 'images/canary.png',
    desc: 'الكناري هو طير الغناء بامتياز. معروف بصوته الحلو اللي يملأ البيت فرحاً. مناسب بزاف للمبتدئين وسهل التربية.',
    specs: {
      'العمر': '6 أشهر',
      'الجنس': 'ذكر / أنثى',
      'الحجم': 'صغير (12-14 سم)',
      'العمر الافتراضي': '10-15 سنة',
      'الغذاء': 'بذور + خضار',
      'البيئة': 'قفص صغير'
    },
    features: {
      'غناء مميز': '✅',
      'سهل التربية': '✅',
      'يتكلم': '❌',
      'اجتماعي': '✅',
      'يحتاج تدريب': '❌',
      'للمبتدئين': '✅'
    },
    difficulty: '⭐ سهل',
    rating: 4.9,
    reviews: 248,
    badge: 'الأكثر طلبا',
    color: '#D4AF37'
  },
  lovebird: {
    id: 'lovebird',
    name: 'عصفور الحب',
    type: '❤️ لافبيرد',
    price: 180,
    oldPrice: 220,
    image: 'images/lovebird.png',
    desc: 'اللافبيرد أو عصفور الحب هو طير عاطفي ومخلص. يحب الرفقة ويمشي مزيان مع صاحبه. معروف بألوانه الزاهية والرائعة.',
    specs: {
      'العمر': '3-6 أشهر',
      'الجنس': 'زوج',
      'الحجم': 'صغير (15-17 سم)',
      'العمر الافتراضي': '15-25 سنة',
      'الغذاء': 'بذور + فواكه',
      'البيئة': 'قفص متوسط'
    },
    features: {
      'غناء مميز': '✅',
      'سهل التربية': '✅',
      'يتكلم': '❌',
      'اجتماعي': '✅',
      'يحتاج تدريب': '✅',
      'للمبتدئين': '✅'
    },
    difficulty: '⭐⭐ متوسط',
    rating: 4.8,
    reviews: 183,
    badge: 'جديد',
    color: '#25D366'
  },
  cockatiel: {
    id: 'cockatiel',
    name: 'الكوكاتيل الملكي',
    type: '👑 كوكاتيل',
    price: 280,
    oldPrice: 350,
    image: 'images/cockatiel.png',
    desc: 'الكوكاتيل هو ملك الطيور الأليفة. ذكي جداً، يتعلم بسرعة ويقدر يقلد الأصوات والأغاني. طير فاخر يستحق الاستثمار.',
    specs: {
      'العمر': '6-12 شهر',
      'الجنس': 'ذكر / أنثى',
      'الحجم': 'متوسط (30-33 سم)',
      'العمر الافتراضي': '20-30 سنة',
      'الغذاء': 'بذور + فواكه + خضار',
      'البيئة': 'قفص كبير'
    },
    features: {
      'غناء مميز': '✅',
      'سهل التربية': '✅',
      'يتكلم': '✅',
      'اجتماعي': '✅',
      'يحتاج تدريب': '✅',
      'للمبتدئين': '❌'
    },
    difficulty: '⭐⭐⭐ يحتاج خبرة',
    rating: 4.9,
    reviews: 97,
    badge: 'بريميوم',
    color: '#8B5CF6'
  }
};

// Compare list
let compareList = [];
// Cart
let cart = [];
let cartTotal = 0;

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- NAVBAR CART BUTTON ----
document.getElementById('cartBtn').addEventListener('click', toggleCart);

// ---- CART FUNCTIONS ----
function addToCart(id, name, price) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  updateCartUI();
  showToast(`✅ تضاف "${name}" للسلة!`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = total;

  const itemsEl = document.getElementById('cartItems');
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">السلة فارغة 🐣</p>';
    return;
  }
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price * item.qty} درهم ${item.qty > 1 ? `(×${item.qty})` : ''}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">🗑️</button>
    </div>
  `).join('');
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const backdrop = document.getElementById('cartBackdrop');
  sidebar.classList.toggle('open');
  backdrop.classList.toggle('show');
}

function checkout() {
  if (cart.length === 0) {
    showToast('⚠️ السلة فارغة!');
    return;
  }
  const items = cart.map(i => `${i.name} (${i.qty}x) = ${i.price * i.qty} درهم`).join('%0A');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const msg = `مرحبا، بغيت نطلب من بيبيات الأطلس:%0A%0A${items}%0A%0Aالمجموع: ${total} درهم`;
  window.open(`https://wa.me/212600000000?text=${msg}`, '_blank');
}

// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ---- COMPARE FUNCTIONS ----
function toggleCompare(id, checkbox) {
  if (checkbox.checked) {
    if (compareList.length >= 3) {
      showToast('⚠️ مكنقدرش نزيد أكثر من 3 طيور للمقارنة!');
      checkbox.checked = false;
      return;
    }
    if (!compareList.includes(id)) compareList.push(id);
  } else {
    compareList = compareList.filter(b => b !== id);
  }
  renderCompareTable();
}

function renderCompareTable() {
  const table = document.getElementById('compareTable');
  const placeholder = document.getElementById('comparePlaceholder');
  const head = document.getElementById('compareHead');
  const body = document.getElementById('compareBody');

  if (compareList.length < 2) {
    table.style.display = 'none';
    placeholder.style.display = 'block';
    return;
  }

  table.style.display = 'table';
  placeholder.style.display = 'none';

  const birds = compareList.map(id => BIRDS[id]);

  // Header
  head.innerHTML = `
    <th class="label-col">الخاصية</th>
    ${birds.map(b => `
      <th>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <img src="${b.image}" alt="${b.name}" style="width:60px;height:60px;object-fit:cover;border-radius:50%;border:2px solid ${b.color}" />
          <span style="color:${b.color}">${b.name}</span>
        </div>
      </th>
    `).join('')}
  `;

  // Body rows
  const rows = [
    { key: 'السعر', vals: birds.map(b => `<strong style="color:var(--gold)">${b.price} درهم</strong>`) },
    { key: 'الحجم', vals: birds.map(b => b.specs['الحجم']) },
    { key: 'العمر الافتراضي', vals: birds.map(b => b.specs['العمر الافتراضي']) },
    { key: 'صعوبة التربية', vals: birds.map(b => b.difficulty) },
    { key: 'الغذاء', vals: birds.map(b => b.specs['الغذاء']) },
    { key: 'التقييم', vals: birds.map(b => `⭐ ${b.rating} (${b.reviews} تقييم)`) },
    ...Object.keys(birds[0].features).map(feat => ({
      key: feat,
      vals: birds.map(b => `<span class="${b.features[feat] === '✅' ? 'check-yes' : 'check-no'}">${b.features[feat]}</span>`)
    })),
    { key: 'الطلب', vals: birds.map(b => `<button class="add-cart-btn" style="font-size:0.75rem;padding:8px 14px" onclick="addToCart('${b.id}','${b.name}',${b.price})">🛒 أضف للسلة</button>`) }
  ];

  body.innerHTML = rows.map(row => `
    <tr>
      <td class="label-col">${row.key}</td>
      ${row.vals.map(v => `<td>${v}</td>`).join('')}
    </tr>
  `).join('');

  // Scroll to compare
  document.getElementById('compare').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---- MODAL FUNCTIONS ----
function openModal(id) {
  const b = BIRDS[id];
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="modal-img-side">
      <img src="${b.image}" alt="${b.name}" />
    </div>
    <div class="modal-info-side">
      <div class="modal-tag">${b.type}</div>
      <h2 class="modal-name">${b.name}</h2>
      <div class="card-ratings">
        <span class="stars">⭐ ${b.rating}</span>
        <span class="reviews">(${b.reviews} تقييم)</span>
      </div>
      <p class="modal-desc">${b.desc}</p>
      <div class="modal-price">
        ${b.price} <small>درهم</small>
        <span style="font-size:1rem;color:var(--text-muted);text-decoration:line-through;margin-right:10px">${b.oldPrice} درهم</span>
      </div>
      <div class="modal-specs">
        <h4>📋 المواصفات</h4>
        ${Object.entries(b.specs).map(([k,v]) => `
          <div class="spec-row">
            <span class="spec-key">${k}</span>
            <span class="spec-val">${v}</span>
          </div>
        `).join('')}
      </div>
      <div class="modal-actions">
        <button class="add-cart-btn" onclick="addToCart('${b.id}','${b.name}',${b.price}); closeModal()">
          🛒 أضف للسلة
        </button>
        <button class="whatsapp-order-btn" onclick="orderWhatsApp('${b.name}', ${b.price})">
          💬 اطلب واتساب
        </button>
      </div>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function orderWhatsApp(name, price) {
  const msg = `مرحبا 👋، بغيت نشري ${name} بـ ${price} درهم من متجر بيبيات الأطلس. واش متوفر؟`;
  window.open(`https://wa.me/212600000000?text=${encodeURIComponent(msg)}`, '_blank');
}

// Close modal on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ---- INTERSECTION OBSERVER (Card animations) ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.bird-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  card.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s, box-shadow 0.35s, border-color 0.35s`;
  observer.observe(card);
});
