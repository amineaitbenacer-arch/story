// server/migrate.js — Create tables + seed bird data
import 'dotenv/config';
import pool from './db.js';

// ---- BIRD SEED DATA (from original app.js) ----
const BIRDS_SEED = [
  {
    id: 'canary', name: 'الكناري الذهبي', type: '🎵 كناري غناء',
    price: 120, old_price: 150, discount: 20,
    image: 'images/canary.png', category: ['singing', 'small'],
    badge: 'pop', badge_text: 'الأكثر طلبا',
    rating: 4.9, reviews: 248,
    desc_ar: 'الكناري طير الغناء بامتياز. معروف بصوته الحلو والممتع. مناسب للمبتدئين، سهل التربية ويملأ البيت فرحاً.',
    specs: { 'العمر': '6 أشهر', 'الحجم': '12-14 سم', 'العمر الافتراضي': '10-15 سنة', 'الغذاء': 'بذور + خضار', 'البيئة': 'قفص صغير', 'التدريب': 'لا يحتاج' },
    features: ['🎶 غناء مميز', '🏠 سهل التربية', '💛 ألوان جميلة', '👶 للمبتدئين'],
    can_speak: false, difficulty: '⭐ سهل', color: '#D4AF37',
    tags: ['غناء', 'سهل', 'صغير']
  },
  {
    id: 'lovebird', name: 'عصفور الحب', type: '❤️ لافبيرد',
    price: 180, old_price: 220, discount: 18,
    image: 'images/lovebird.png', category: ['parrot', 'small'],
    badge: 'new', badge_text: 'جديد',
    rating: 4.8, reviews: 183,
    desc_ar: 'اللافبيرد أو عصفور الحب طير عاطفي ومخلص. يحب الرفقة ويمشي مزيان مع صاحبه. ألوانه الزاهية تخطف الأنظار.',
    specs: { 'العمر': '3-6 أشهر', 'الحجم': '15-17 سم', 'العمر الافتراضي': '15-25 سنة', 'الغذاء': 'بذور + فواكه', 'البيئة': 'قفص متوسط', 'التدريب': 'بسيط' },
    features: ['❤️ عاطفي جداً', '🎨 ألوان نادرة', '🤝 اجتماعي', '👫 يعيش بزوج'],
    can_speak: false, difficulty: '⭐⭐ متوسط', color: '#25D366',
    tags: ['عاطفي', 'ملون', 'زوج']
  },
  {
    id: 'cockatiel', name: 'الكوكاتيل الملكي', type: '👑 كوكاتيل',
    price: 280, old_price: 350, discount: 20,
    image: 'images/cockatiel.png', category: ['parrot', 'premium'],
    badge: 'prem', badge_text: 'بريميوم',
    rating: 4.9, reviews: 97,
    desc_ar: 'الكوكاتيل ملك الطيور الأليفة. ذكي جداً، يتعلم بسرعة ويقلد الأصوات والأغاني. طير فاخر يستحق الاستثمار.',
    specs: { 'العمر': '6-12 شهر', 'الحجم': '30-33 سم', 'العمر الافتراضي': '20-30 سنة', 'الغذاء': 'بذور + فواكه + خضار', 'البيئة': 'قفص كبير', 'التدريب': 'ضروري' },
    features: ['🧠 ذكي جداً', '🗣️ يتكلم', '👑 فاخر', '🎵 يغني'],
    can_speak: true, difficulty: '⭐⭐⭐ خبرة', color: '#8B5CF6',
    tags: ['يتكلم', 'ذكي', 'فاخر']
  },
  {
    id: 'budgie', name: 'البادجي الملون', type: '🦜 بادجيريغار',
    price: 80, old_price: 100, discount: 20,
    image: 'images/budgie.png', category: ['parrot', 'small'],
    badge: 'pop', badge_text: 'الأرخص',
    rating: 4.7, reviews: 312,
    desc_ar: 'البادجي (الدرة) أشهر طيور الزينة في العالم. صغير الحجم، جميل الألوان، يتكيف بسهولة مع الأسرة كلها.',
    specs: { 'العمر': '2-4 أشهر', 'الحجم': '18 سم', 'العمر الافتراضي': '7-15 سنة', 'الغذاء': 'بذور متنوعة', 'البيئة': 'قفص صغير', 'التدريب': 'اختياري' },
    features: ['🦜 ألوان زاهية', '💰 سعر مناسب', '😊 ودود', '🔊 ثرثار'],
    can_speak: true, difficulty: '⭐ سهل', color: '#06B6D4',
    tags: ['رخيص', 'ملون', 'ثرثار']
  },
  {
    id: 'african_grey', name: 'الببغاء الأفريقي', type: '🧠 ببغاء رمادي',
    price: 1200, old_price: 1500, discount: 20,
    image: 'images/african_grey.png', category: ['parrot', 'premium'],
    badge: 'prem', badge_text: 'نادر',
    rating: 5.0, reviews: 42,
    desc_ar: 'الببغاء الرمادي الأفريقي أذكى طيور العالم. يقدر يتكلم بوضوح بزاف، يفهم المعنى ويتفاعل مع الأسرة بشكل مذهل.',
    specs: { 'العمر': '1-2 سنة', 'الحجم': '33 سم', 'العمر الافتراضي': '50-60 سنة', 'الغذاء': 'فواكه + خضار + جوز', 'البيئة': 'قفص كبير جداً', 'التدريب': 'ضروري يومياً' },
    features: ['🧠 الأذكى عالمياً', '🗣️ يتكلم بوضوح', '🎓 يفهم المعنى', '👨‍👩‍👧 طير العائلة'],
    can_speak: true, difficulty: '⭐⭐⭐⭐ محترف', color: '#6366F1',
    tags: ['أذكى', 'يتكلم', 'نادر', 'فاخر']
  },
  {
    id: 'sun_conure', name: 'الكونور الشمسي', type: '🌞 كونور',
    price: 650, old_price: 800, discount: 18,
    image: 'images/sun_conure.png', category: ['parrot', 'premium'],
    badge: 'hot', badge_text: '🔥 ترند',
    rating: 4.8, reviews: 61,
    desc_ar: 'أجمل طير ممكن تطيح عليه عينك! 😍 الكونور الشمسي هو لوحة فنية متحركة بألوان غروب الشمس الساحرة (البرتقالي، الأصفر، والأخضر). هاد الطير عندو شخصية ديال "نجم" حقيقي: نشيط بزاف، كيضحك، كيبغي اللعب، وكيموت على الاهتمام. 🌟 إذا بغيتي طير اللي يخلي الدار كاملة تضحك وتنشط، هادا هو الاختيار المثالي! الطير ديالنا متربي على اليد ومأقلم مزيان. ما تترددش، هاد السلالة نادرة جداً وكتخطف الأنظار فوراً! اطلبه الآن وخليه ينور دارك! ✨',
    specs: { 'العمر': '6-12 شهر', 'الحجم': '30 سم', 'العمر الافتراضي': '20-30 سنة', 'الغذاء': 'فواكه + بذور', 'البيئة': 'قفص كبير', 'التدريب': 'ضروري' },
    features: ['🌈 ألوان ساحرة تخطف الأنظار', '😄 شخصية مرحة وطاقة إيجابية', '🤹 بهلواني يعشق اللعب', '🌟 متربي على اليد (أليف جداً)', '🔥 الأكثر طلباً للزينة'],
    can_speak: true, difficulty: '⭐⭐⭐ خبرة', color: '#F59E0B',
    tags: ['ملون', 'مرح', 'ترند']
  },
  {
    id: 'ringneck', name: 'الرينغنيك الأخضر', type: '💚 رينغنيك',
    price: 320, old_price: 400, discount: 20,
    image: 'images/ringneck.png', category: ['parrot', 'singing'],
    badge: 'new', badge_text: 'وصل حديثاً',
    rating: 4.6, reviews: 78,
    desc_ar: 'فخامة اللون الأخضر الزمردي! 💎 ببغاء الرينغنيك (صاحب الطوق) هو رمز الأناقة والجمال الآسيوي الأصيل. هاد الطير ذكي بزاف ومشهور بقدرته الفائقة على تقليد الأصوات والكلمات بطريقة كتحمق وواضحة. 🗣️ شخصيته قوية، مستقلة، وكيعشق يطير ويستكشف. بالإضافة لهادشي كامل، هاد الطير اللي كنوفرولكم مدرب، صحته ممتازة 100%، وكيجي بشهادة ضمان صحية. إلا بغيتي طير أنيق، ذكي ومتكلم، هادا هو القرار الصح! اطلب دابا قبل النفاذ! 🛒',
    specs: { 'العمر': '6-12 شهر', 'الحجم': '40-43 سم', 'العمر الافتراضي': '20-30 سنة', 'الغذاء': 'بذور + خضار + فواكه', 'البيئة': 'قفص كبير', 'التدريب': 'مهم' },
    features: ['💚 أناقة اللون الزمردي', '🗣️ متحدث بطلاقة ووضوح', '🦸 مستقل وقوي الشخصية', '✈️ يحب الطيران الحر', '✅ مضمون ومفحوص طبياً'],
    can_speak: true, difficulty: '⭐⭐⭐ خبرة', color: '#10B981',
    tags: ['أنيق', 'يتكلم', 'كبير']
  },
  {
    id: 'finch', name: 'الزرزور الزيبرا', type: '🎶 زرزور',
    price: 60, old_price: 75, discount: 20,
    image: 'images/finch.png', category: ['singing', 'small'],
    badge: 'pop', badge_text: '⚡ سريع البيع',
    rating: 4.7, reviews: 201,
    desc_ar: 'الروعة فـ أبسط أشكالها! 🐣 الزرزور الزيبرا هو طير صغير، كيوت، كيحمق، والأهم من هادشي كامل: كيغني واحد الألحان متواصلة ومريحة بحال شي موسيقى كلاسيكية هادئة. 🎶 مثالي للناس اللي معندهمش وقت بزاف للعناية، حيت هاد الطير كيعتمد على راسو بزاف، مكيحتاجش تدريب ولا مجهود كبير، ومع ذلك كيعطيك جو زوين فدارك. الثمن ديالو فرصة ما كتعوضش، والجودة ديالنا خلاتو يكون الأكثر مبيعاً هاد السيمانة! 🚀 ضرب عصفورين بحجر: طير زوين وثمن واعر، اطلبه دابا!',
    specs: { 'العمر': '2-4 أشهر', 'الحجم': '10-11 سم', 'العمر الافتراضي': '7-10 سنوات', 'الغذاء': 'بذور صغيرة', 'البيئة': 'قفص صغير', 'التدريب': 'لا يحتاج' },
    features: ['🎶 غناء متواصل يريح الأعصاب', '🐥 صغير وكيوت بزاف', '💰 ثمن لا يصدق (أرخص طير)', '😌 هادئ ولا يحتاج مجهود', '⚡ نفاد الكمية قريب جداً'],
    can_speak: false, difficulty: '⭐ سهل جداً', color: '#F97316',
    tags: ['هادئ', 'صغير', 'رخيص', 'غناء']
  }
];

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('🔌 Connected to Neon PostgreSQL...');

    // Drop table to reset data with new copy
    await client.query(`DROP TABLE IF EXISTS birds;`);

    // ---- CREATE TABLES ----
    await client.query(`
      CREATE TABLE IF NOT EXISTS birds (
        id            TEXT PRIMARY KEY,
        name          TEXT NOT NULL,
        type          TEXT,
        price         INTEGER NOT NULL,
        old_price     INTEGER,
        discount      INTEGER,
        image         TEXT,
        category      TEXT[],
        badge         TEXT,
        badge_text    TEXT,
        rating        NUMERIC(3,1),
        reviews       INTEGER,
        desc_ar       TEXT,
        specs_json    JSONB,
        features_json JSONB,
        can_speak     BOOLEAN DEFAULT FALSE,
        difficulty    TEXT,
        color         TEXT,
        tags_json     JSONB,
        created_at    TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ Table `birds` ready');

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id            SERIAL PRIMARY KEY,
        items_json    JSONB NOT NULL,
        total         INTEGER NOT NULL,
        whatsapp_msg  TEXT,
        customer_info JSONB,
        created_at    TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ Table `orders` ready');

    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id         SERIAL PRIMARY KEY,
        phone      TEXT NOT NULL,
        source     TEXT DEFAULT 'cta',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ Table `leads` ready');

    await client.query(`
      CREATE TABLE IF NOT EXISTS custom_requests (
        id         SERIAL PRIMARY KEY,
        bird_name  TEXT NOT NULL,
        phone      TEXT NOT NULL,
        notes      TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ Table `custom_requests` ready');

    // ---- SEED BIRDS ----
    console.log('\n🌱 Seeding birds...');
    for (const b of BIRDS_SEED) {
      await client.query(`
        INSERT INTO birds (
          id, name, type, price, old_price, discount,
          image, category, badge, badge_text,
          rating, reviews, desc_ar, specs_json, features_json,
          can_speak, difficulty, color, tags_json
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
          $11,$12,$13,$14,$15,$16,$17,$18,$19
        )
        ON CONFLICT (id) DO UPDATE SET
          price       = EXCLUDED.price,
          old_price   = EXCLUDED.old_price,
          rating      = EXCLUDED.rating,
          reviews     = EXCLUDED.reviews;
      `, [
        b.id, b.name, b.type, b.price, b.old_price, b.discount,
        b.image, b.category, b.badge, b.badge_text,
        b.rating, b.reviews, b.desc_ar,
        JSON.stringify(b.specs),
        JSON.stringify(b.features),
        b.can_speak, b.difficulty, b.color,
        JSON.stringify(b.tags)
      ]);
      console.log(`  🐦 Seeded: ${b.name}`);
    }

    console.log('\n🎉 Migration complete! All tables created and birds seeded.');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
