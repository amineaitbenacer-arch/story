// ================================================
//  JADID PAGE JS - Stories, Chirp Synth & Feed
// ================================================

// ---- API CONFIG ----
const API_BASE = 'http://localhost:3001/api';

// ---- STORIES DATA ----
const STORIES = [
  {
    title: "فقس اليوم 🐣",
    time: "قبل ساعتين • مزرعة الأطلس",
    image: "images/canary.png",
    caption: "شاهد فقس 4 زغاليل كناري موزايك اليوم فـ المزرعة! صحة جيدة وتربية طبيعية 100%.",
    bird: "كناري موزايك أحمر",
    price: 160
  },
  {
    title: "تدريب الكوكاتيل 👑",
    time: "قبل 4 ساعات • قسم الترويض",
    image: "images/cockatiel.png",
    caption: "كوكاتيل بيرل ملكي أليف جداً يتعلم الصعود على الأصبع والدوران بسهولة!",
    bird: "كوكاتيل بيرل ملكي",
    price: 320
  },
  {
    title: "الكاسكو يتكلم 🧠",
    time: "قبل 6 ساعات • الببغاوات",
    image: "images/african_grey.png",
    caption: "الببغاء الأفريقي الرمادي يكرر تحية 'مرحبا' و يقلد جرس الهاتف بوضوح رهيب!",
    bird: "ببغاء أفريقي متكلم",
    price: 1200
  },
  {
    title: "فحص بيطري شامل 🩺",
    time: "أمس • العيادة البيطرية",
    image: "images/lovebird.png",
    caption: "الدكتور البيطري يفحص أجنحة وريش طيور اللافبيرد وتأكيد خلوها من جميع الأمراض.",
    bird: "زوج عصفور الحب",
    price: 180
  },
  {
    title: "تغذية يدوية 🍼",
    time: "أمس • الحضانة",
    image: "images/sun_conure.png",
    caption: "إطعام زغاليل الكونور الشمسي بالسرنجة المخصصة لتقوية مناعتهم وجعلهم أليفين مع البشر.",
    bird: "كونور شمسي أليف",
    price: 950
  }
];

let activeStoryIndex = 0;
let storyTimer = null;

function openStory(index) {
  activeStoryIndex = index;
  const s = STORIES[index];

  document.getElementById('storyTitle').textContent = s.title;
  document.getElementById('storyTime').textContent = s.time;
  document.getElementById('storyAvatar').src = s.image;
  document.getElementById('storyImage').src = s.image;
  document.getElementById('storyCaption').textContent = s.caption;

  const btn = document.getElementById('storyActionBtn');
  btn.setAttribute('onclick', `orderWhatsApp('${s.bird}', ${s.price})`);

  const modal = document.getElementById('storyModal');
  modal.classList.add('active');

  const fill = document.getElementById('storyProgress');
  fill.style.transition = 'none';
  fill.style.width = '0%';

  setTimeout(() => {
    fill.style.transition = 'width 5s linear';
    fill.style.width = '100%';
  }, 50);

  clearTimeout(storyTimer);
  storyTimer = setTimeout(() => {
    if (activeStoryIndex < STORIES.length - 1) {
      openStory(activeStoryIndex + 1);
    } else {
      closeStory();
    }
  }, 5050);
}

function closeStory() {
  document.getElementById('storyModal').classList.remove('active');
  clearTimeout(storyTimer);
}

// Close story modal on backdrop click or ESC
document.getElementById('storyModal')?.addEventListener('click', (e) => {
  if (e.target.classList.contains('story-modal-overlay')) {
    closeStory();
  }
});

// ---- BIRD CHIRP SYNTHESIZER (Web Audio API) ----
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSynthesizedSong(birdType) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Visual wave animation
  const wave = document.getElementById(`wave-${birdType}`);
  if (wave) {
    wave.classList.add('active');
    setTimeout(() => wave.classList.remove('active'), 2500);
  }

  showToast(`🎵 تشغيل صوت غناء: ${birdType}`);

  if (birdType === 'canary') {
    // Canary whistling melody: high trills
    const freqs = [1760, 2093, 2349, 2637, 3135, 2637, 2349, 3135];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.18);
      osc.frequency.exponentialRampToValueAtTime(f + 200, now + i * 0.18 + 0.12);

      gain.gain.setValueAtTime(0, now + i * 0.18);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.18 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.18);
      osc.stop(now + i * 0.18 + 0.16);
    });
  } else if (birdType === 'cockatiel') {
    // Cockatiel wolf whistle tune
    const notes = [
      { f: 987, d: 0.2, start: 0 },
      { f: 1318, d: 0.35, start: 0.25 },
      { f: 1567, d: 0.2, start: 0.7 },
      { f: 1318, d: 0.4, start: 0.95 }
    ];
    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.start);
      osc.frequency.linearRampToValueAtTime(n.f * 1.15, now + n.start + n.d);

      gain.gain.setValueAtTime(0, now + n.start);
      gain.gain.linearRampToValueAtTime(0.25, now + n.start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + n.start);
      osc.stop(now + n.start + n.d);
    });
  } else if (birdType === 'lovebird') {
    // Lovebird fast chirping
    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const baseF = 2400 + Math.random() * 400;
      osc.frequency.setValueAtTime(baseF, now + i * 0.12);
      osc.frequency.exponentialRampToValueAtTime(baseF - 500, now + i * 0.12 + 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.12 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.1);
    }
  } else if (birdType === 'grey') {
    // African Grey whistling phrase & speech modulation simulation
    const phrases = [
      { f: 800, t: 0 },
      { f: 1200, t: 0.2 },
      { f: 1000, t: 0.4 },
      { f: 1600, t: 0.7 },
      { f: 1400, t: 0.9 }
    ];
    phrases.forEach(p => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(p.f, now + p.t);

      gain.gain.setValueAtTime(0, now + p.t);
      gain.gain.linearRampToValueAtTime(0.2, now + p.t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + p.t + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + p.t);
      osc.stop(now + p.t + 0.19);
    });
  }
}

// ---- CUSTOM BIRD REQUEST FORM ----
const API_BASE = 'http://localhost:3001/api';

async function handleCustomRequest(e) {
  e.preventDefault();
  const bird  = document.getElementById('reqBirdName').value.trim();
  const phone = document.getElementById('reqPhone').value.trim();

  if (!bird || !phone) return;

  // 💾 Save to database
  // ✅ Save to Database
  try {
    const res = await fetch(`${API_BASE}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bird_name: bird, phone })
    });
    const data = await res.json();
    if (data.success) {
      console.log(`🐦 Custom request #${data.request_id} saved to DB`);
    }
  } catch (err) {
    console.warn('⚠️ API unavailable, request not saved to DB:', err.message);
  }

  const msg = `مرحبا 👋، بغيت نطلب توفير هذا الطير فـ بيبيات الأطلس:%0A📌 اسم الطير: ${bird}%0A📱 رقم الهاتف: ${phone}`;
  window.open(`https://wa.me/212600000000?text=${msg}`, '_blank');
  showToast('✅ تم إرسال طلب الطير وحفظ فالـ Database!');
  e.target.reset();
}

// Initialize active styles for jadid page nav
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  if (currentPath.includes('jadid.html')) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === 'jadid.html') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
});
