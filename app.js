// =====================================================
//  BIBIYAT ATLAS v2 — Full Store JavaScript
// =====================================================

// ---- BIRD DATA (8 types) ----
const BIRDS = {
  canary: {
    id:'canary', name:'الكناري الذهبي', type:'🎵 كناري غناء',
    price:120, oldPrice:150, discount:20,
    image:'images/canary.png', category:['singing','small'],
    badge:'pop', badgeText:'الأكثر طلبا',
    rating:4.9, reviews:248,
    desc:'الكناري طير الغناء بامتياز. معروف بصوته الحلو والممتع. مناسب للمبتدئين، سهل التربية ويملأ البيت فرحاً.',
    specs:{'العمر':'6 أشهر','الحجم':'12-14 سم','العمر الافتراضي':'10-15 سنة','الغذاء':'بذور + خضار','البيئة':'قفص صغير','التدريب':'لا يحتاج'},
    features:['🎶 غناء مميز','🏠 سهل التربية','💛 ألوان جميلة','👶 للمبتدئين'],
    canSpeak:false, difficulty:'⭐ سهل', color:'#D4AF37',
    tags:['غناء','سهل','صغير']
  },
  lovebird: {
    id:'lovebird', name:'عصفور الحب', type:'❤️ لافبيرد',
    price:180, oldPrice:220, discount:18,
    image:'images/lovebird.png', category:['parrot','small'],
    badge:'new', badgeText:'جديد',
    rating:4.8, reviews:183,
    desc:'اللافبيرد أو عصفور الحب طير عاطفي ومخلص. يحب الرفقة ويمشي مزيان مع صاحبه. ألوانه الزاهية تخطف الأنظار.',
    specs:{'العمر':'3-6 أشهر','الحجم':'15-17 سم','العمر الافتراضي':'15-25 سنة','الغذاء':'بذور + فواكه','البيئة':'قفص متوسط','التدريب':'بسيط'},
    features:['❤️ عاطفي جداً','🎨 ألوان نادرة','🤝 اجتماعي','👫 يعيش بزوج'],
    canSpeak:false, difficulty:'⭐⭐ متوسط', color:'#25D366',
    tags:['عاطفي','ملون','زوج']
  },
  cockatiel: {
    id:'cockatiel', name:'الكوكاتيل الملكي', type:'👑 كوكاتيل',
    price:280, oldPrice:350, discount:20,
    image:'images/cockatiel.png', category:['parrot','premium'],
    badge:'prem', badgeText:'بريميوم',
    rating:4.9, reviews:97,
    desc:'الكوكاتيل ملك الطيور الأليفة. ذكي جداً، يتعلم بسرعة ويقلد الأصوات والأغاني. طير فاخر يستحق الاستثمار.',
    specs:{'العمر':'6-12 شهر','الحجم':'30-33 سم','العمر الافتراضي':'20-30 سنة','الغذاء':'بذور + فواكه + خضار','البيئة':'قفص كبير','التدريب':'ضروري'},
    features:['🧠 ذكي جداً','🗣️ يتكلم','👑 فاخر','🎵 يغني'],
    canSpeak:true, difficulty:'⭐⭐⭐ خبرة', color:'#8B5CF6',
    tags:['يتكلم','ذكي','فاخر']
  },
  budgie: {
    id:'budgie', name:'البادجي الملون', type:'🦜 بادجيريغار',
    price:80, oldPrice:100, discount:20,
    image:'images/budgie.png', category:['parrot','small'],
    badge:'pop', badgeText:'الأرخص',
    rating:4.7, reviews:312,
    desc:'البادجي (الدرة) أشهر طيور الزينة في العالم. صغير الحجم، جميل الألوان، يتكيف بسهولة مع الأسرة كلها.',
    specs:{'العمر':'2-4 أشهر','الحجم':'18 سم','العمر الافتراضي':'7-15 سنة','الغذاء':'بذور متنوعة','البيئة':'قفص صغير','التدريب':'اختياري'},
    features:['🦜 ألوان زاهية','💰 سعر مناسب','😊 ودود','🔊 ثرثار'],
    canSpeak:true, difficulty:'⭐ سهل', color:'#06B6D4',
    tags:['رخيص','ملون','ثرثار']
  },
  african_grey: {
    id:'african_grey', name:'الببغاء الأفريقي', type:'🧠 ببغاء رمادي',
    price:1200, oldPrice:1500, discount:20,
    image:'images/african_grey.png', category:['parrot','premium'],
    badge:'prem', badgeText:'نادر',
    rating:5.0, reviews:42,
    desc:'الببغاء الرمادي الأفريقي أذكى طيور العالم. يقدر يتكلم بوضوح بزاف، يفهم المعنى ويتفاعل مع الأسرة بشكل مذهل.',
    specs:{'العمر':'1-2 سنة','الحجم':'33 سم','العمر الافتراضي':'50-60 سنة','الغذاء':'فواكه + خضار + جوز','البيئة':'قفص كبير جداً','التدريب':'ضروري يومياً'},
    features:['🧠 الأذكى عالمياً','🗣️ يتكلم بوضوح','🎓 يفهم المعنى','👨‍👩‍👧 طير العائلة'],
    canSpeak:true, difficulty:'⭐⭐⭐⭐ محترف', color:'#6366F1',
    tags:['أذكى','يتكلم','نادر','فاخر']
  },
  sun_conure: {
    id:'sun_conure', name:'الكونور الشمسي', type:'🌞 كونور',
    price:650, oldPrice:800, discount:18,
    image:'images/sun_conure.png', category:['parrot','premium'],
    badge:'hot', badgeText:'🔥 ترند',
    rating:4.8, reviews:61,
    desc:'الكونور الشمسي أجمل طيور الألوان. ألوانه البرتقالية والصفراء والخضراء مذهلة. شخصيته فرحة ومحبة للعب.',
    specs:{'العمر':'6-12 شهر','الحجم':'30 سم','العمر الافتراضي':'20-30 سنة','الغذاء':'فواكه + بذور','البيئة':'قفص كبير','التدريب':'ضروري'},
    features:['🌈 أجمل الألوان','😄 شخصية مرحة','🤹 يحب اللعب','🔊 صوت عال'],
    canSpeak:true, difficulty:'⭐⭐⭐ خبرة', color:'#F59E0B',
    tags:['ملون','مرح','ترند']
  },
  ringneck: {
    id:'ringneck', name:'الرينغنيك الأخضر', type:'💚 رينغنيك',
    price:320, oldPrice:400, discount:20,
    image:'images/ringneck.png', category:['parrot','singing'],
    badge:'new', badgeText:'وصل حديثاً',
    rating:4.6, reviews:78,
    desc:'الرينغنيك أو ببغاء الرقبة الحلقية، طير أنيق بلونه الأخضر الزاهي. يتكلم جيداً ويحب التفاعل مع صاحبه.',
    specs:{'العمر':'6-12 شهر','الحجم':'40-43 سم','العمر الافتراضي':'20-30 سنة','الغذاء':'بذور + خضار + فواكه','البيئة':'قفص كبير','التدريب':'مهم'},
    features:['💚 أنيق بزاف','🗣️ يتكلم','🦸 مستقل','✈️ يحب الطيران'],
    canSpeak:true, difficulty:'⭐⭐⭐ خبرة', color:'#10B981',
    tags:['أنيق','يتكلم','كبير']
  },
  finch: {
    id:'finch', name:'الزرزور الزيبرا', type:'🎶 زرزور',
    price:60, oldPrice:75, discount:20,
    image:'images/finch.png', category:['singing','small'],
    badge:'pop', badgeText:'⚡ سريع البيع',
    rating:4.7, reviews:201,
    desc:'الزرزور الزيبرا طير صغير وجميل بنقشاته المميزة. يغني بطريقة رائعة ويناسب الأشخاص الذين يريدون طيراً هادئاً.',
    specs:{'العمر':'2-4 أشهر','الحجم':'10-11 سم','العمر الافتراضي':'7-10 سنوات','الغذاء':'بذور صغيرة','البيئة':'قفص صغير','التدريب':'لا يحتاج'},
    features:['🎶 غناء جميل','🐥 صغير وكيوت','💰 سعر ممتاز','😌 هادئ'],
    canSpeak:false, difficulty:'⭐ سهل جداً', color:'#F97316',
    tags:['هادئ','صغير','رخيص','غناء']
  }
};

const BIRD_LIST = Object.values(BIRDS);

// ---- STATE ----
let cart = {};         // { id: qty }
let compareList = [];  // max 3

// =====================================================
//  INIT
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  renderBirdsGrid(BIRD_LIST);
  setupNav();
  setupSearch();
  setupFilters();
  setupAnimations();
  setupBackTop();
});

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

function checkout() {
  const items = Object.entries(cart);
  if (!items.length) { showToast('⚠️ السلة فارغة!'); return; }
  const total = items.reduce((s, [id, qty]) => s + BIRDS[id].price * qty, 0);
  const lines = items.map(([id, qty]) => `${BIRDS[id].name} × ${qty} = ${BIRDS[id].price * qty} درهم`).join('\n');
  const msg = `مرحبا 👋 بغيت نطلب من بيبيات الأطلس:\n\n${lines}\n\nالمجموع: ${total} درهم`;
  window.open(`https://wa.me/212600000000?text=${encodeURIComponent(msg)}`, '_blank');
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
function ctaSignup() {
  const phone = document.getElementById('ctaPhone').value.trim();
  if (!phone) { showToast('⚠️ أدخل رقم واتساب ديالك'); return; }
  const msg = `مرحبا 👋 عندي رقم ${phone}، بغيت الخصم 15% 🎁`;
  window.open(`https://wa.me/212600000000?text=${encodeURIComponent(msg)}`, '_blank');
  document.getElementById('ctaPhone').value = '';
  showToast('✅ شكراً! راسلناك على واتساب');
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
