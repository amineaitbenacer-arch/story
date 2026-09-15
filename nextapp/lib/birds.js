// =====================================================
//  BIBIYAT ATLAS — Bird Data (Next.js module)
// =====================================================
export const BIRDS = {
  canary: {
    id:'canary', name:'الكناري الذهبي', nameAr:'Canari', type:'كناري غناء', emoji:'🎵',
    price:120, oldPrice:150, images:['/images/canary.png'],
    badge:'الأكثر طلبا', badgeColor:'#D4AF37', rating:4.9, reviews:248, inStock:true,
    shortDesc:'أجمل طير غناء — يملأ البيت فرحاً وموسيقى',
    desc:'الكناري الذهبي هو طير الغناء بامتياز. معروف بصوته الحلو المميز الذي يملأ البيت بالبهجة والحياة. مناسب جداً للمبتدئين لأنه سهل التربية.',
    specs:[{k:'الحجم',v:'12–14 سم'},{k:'العمر',v:'6 أشهر'},{k:'العمر الافتراضي',v:'10–15 سنة'},{k:'الغذاء',v:'بذور + خضار'},{k:'القفص',v:'صغير'},{k:'الصعوبة',v:'⭐ سهل'}],
    category:['singing','small'], tags:['غناء','سهل','صغير'],
  },
  lovebird: {
    id:'lovebird', name:'عصفور الحب', nameAr:'Lovebird', type:'لافبيرد', emoji:'❤️',
    price:180, oldPrice:220, images:['/images/lovebird.png'],
    badge:'جديد', badgeColor:'#0E7C7B', rating:4.8, reviews:183, inStock:true,
    shortDesc:'طير الحب والإخلاص — ألوان تخطف الأنظار',
    desc:'اللافبيرد أو عصفور الحب طير عاطفي ومخلص لصاحبه. يحب الرفقة والتفاعل، ألوانه الزاهية رائعة جداً ويصلح كهدية مميزة.',
    specs:[{k:'الحجم',v:'15–17 سم'},{k:'العمر',v:'3–6 أشهر'},{k:'العمر الافتراضي',v:'15–25 سنة'},{k:'الغذاء',v:'بذور + فواكه'},{k:'القفص',v:'متوسط'},{k:'الصعوبة',v:'⭐⭐ متوسط'}],
    category:['parrot','small'], tags:['عاطفي','ملون'],
  },
  cockatiel: {
    id:'cockatiel', name:'الكوكاتيل الملكي', nameAr:'Cockatiel', type:'كوكاتيل', emoji:'👑',
    price:280, oldPrice:350, images:['/images/cockatiel.png'],
    badge:'بريميوم', badgeColor:'#7C3AED', rating:4.9, reviews:97, inStock:true,
    shortDesc:'ملك الطيور الأليفة — ذكي ويتكلم',
    desc:'الكوكاتيل هو ملك الطيور الأليفة. ذكي جداً، يتعلم بسرعة ويقلد الأصوات والأغاني. شخصيته لطيفة ويحب التفاعل مع الأسرة.',
    specs:[{k:'الحجم',v:'30–33 سم'},{k:'العمر',v:'6–12 شهر'},{k:'العمر الافتراضي',v:'20–30 سنة'},{k:'الغذاء',v:'بذور + فواكه + خضار'},{k:'القفص',v:'كبير'},{k:'الصعوبة',v:'⭐⭐⭐ خبرة'}],
    category:['parrot','premium'], tags:['يتكلم','ذكي','فاخر'],
  },
  budgie: {
    id:'budgie', name:'البادجي الملون', nameAr:'Budgie', type:'بادجيريغار', emoji:'🦜',
    price:80, oldPrice:100, images:['/images/budgie.png'],
    badge:'الأرخص', badgeColor:'#06B6D4', rating:4.7, reviews:312, inStock:true,
    shortDesc:'أشهر طيور الزينة — ملون وبسعر مناسب',
    desc:'البادجي أشهر طيور الزينة في العالم. صغير الحجم، جميل الألوان، يتكيف بسهولة مع جميع أفراد الأسرة.',
    specs:[{k:'الحجم',v:'18 سم'},{k:'العمر',v:'2–4 أشهر'},{k:'العمر الافتراضي',v:'7–15 سنة'},{k:'الغذاء',v:'بذور متنوعة'},{k:'القفص',v:'صغير'},{k:'الصعوبة',v:'⭐ سهل'}],
    category:['parrot','small'], tags:['رخيص','ملون'],
  },
  african_grey: {
    id:'african_grey', name:'الببغاء الأفريقي', nameAr:'African Grey', type:'ببغاء رمادي', emoji:'🧠',
    price:1200, oldPrice:1500, images:['/images/african_grey.png'],
    badge:'نادر', badgeColor:'#6366F1', rating:5.0, reviews:42, inStock:true,
    shortDesc:'أذكى طيور العالم — يتكلم ويفهم',
    desc:'الببغاء الرمادي الأفريقي أذكى طيور العالم. يقدر يتكلم بوضوح ويفهم المعنى الحقيقي للكلام. استثمار طويل الأمد لأن عمره يصل 60 سنة.',
    specs:[{k:'الحجم',v:'33 سم'},{k:'العمر',v:'1–2 سنة'},{k:'العمر الافتراضي',v:'50–60 سنة'},{k:'الغذاء',v:'فواكه + خضار + جوز'},{k:'القفص',v:'كبير جداً'},{k:'الصعوبة',v:'⭐⭐⭐⭐ محترف'}],
    category:['parrot','premium'], tags:['أذكى','يتكلم','نادر'],
  },
  sun_conure: {
    id:'sun_conure', name:'الكونور الشمسي', nameAr:'Sun Conure', type:'كونور', emoji:'🌞',
    price:650, oldPrice:800, images:['/images/sun_conure.png'],
    badge:'🔥 ترند', badgeColor:'#C9632A', rating:4.8, reviews:61, inStock:true,
    shortDesc:'أجمل ألوان في عالم الطيور',
    desc:'الكونور الشمسي أجمل طيور الألوان على الإطلاق. ألوانه البرتقالية والصفراء والخضراء مذهلة. شخصيته فرحة ومحبة للعب والتفاعل.',
    specs:[{k:'الحجم',v:'30 سم'},{k:'العمر',v:'6–12 شهر'},{k:'العمر الافتراضي',v:'20–30 سنة'},{k:'الغذاء',v:'فواكه + بذور'},{k:'القفص',v:'كبير'},{k:'الصعوبة',v:'⭐⭐⭐ خبرة'}],
    category:['parrot','premium'], tags:['ملون','مرح','ترند'],
  },
  ringneck: {
    id:'ringneck', name:'الرينغنيك الأخضر', nameAr:'Ringneck', type:'رينغنيك', emoji:'💚',
    price:320, oldPrice:400, images:['/images/ringneck.png'],
    badge:'وصل حديثاً', badgeColor:'#10B981', rating:4.6, reviews:78, inStock:true,
    shortDesc:'طير أنيق بلون أخضر زاهي يتكلم',
    desc:'الرينغنيك ببغاء الرقبة الحلقية، طير أنيق بلونه الأخضر الزاهي. يتكلم جيداً ويحب التفاعل مع صاحبه.',
    specs:[{k:'الحجم',v:'40–43 سم'},{k:'العمر',v:'6–12 شهر'},{k:'العمر الافتراضي',v:'20–30 سنة'},{k:'الغذاء',v:'بذور + خضار + فواكه'},{k:'القفص',v:'كبير'},{k:'الصعوبة',v:'⭐⭐⭐ خبرة'}],
    category:['parrot','singing'], tags:['أنيق','يتكلم'],
  },
  finch: {
    id:'finch', name:'الزرزور الزيبرا', nameAr:'Finch', type:'زرزور', emoji:'🎶',
    price:60, oldPrice:75, images:['/images/finch.png'],
    badge:'⚡ سريع البيع', badgeColor:'#F97316', rating:4.7, reviews:201, inStock:true,
    shortDesc:'طير صغير هادئ بغناء جميل',
    desc:'الزرزور الزيبرا طير صغير وجميل بنقشاته المميزة. يغني بطريقة رائعة ومريحة. مثالي للأشخاص الذين يريدون طيراً هادئاً.',
    specs:[{k:'الحجم',v:'10–11 سم'},{k:'العمر',v:'2–4 أشهر'},{k:'العمر الافتراضي',v:'7–10 سنوات'},{k:'الغذاء',v:'بذور صغيرة'},{k:'القفص',v:'صغير'},{k:'الصعوبة',v:'⭐ سهل جداً'}],
    category:['singing','small'], tags:['هادئ','صغير','رخيص'],
  },
};

export const BIRD_LIST = Object.values(BIRDS);
