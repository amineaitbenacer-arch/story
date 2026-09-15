'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BIRDS, BIRD_LIST } from '../../../lib/birds';
import { MARKETING } from '../../../lib/marketing';

const GSHEET_URL = 'https://script.google.com/macros/s/AKfycbyz4vKuA8Is25GCKCtWvB1SDoBlGd3Qyp-2ucm6lxnbKovrvfTmIHmywDROaB8gG0BG/exec';

export default function ProductPage({ params }) {
  const { id } = params;
  const B = BIRDS[id];
  const M = MARKETING[id];
  const router = useRouter();

  const [qty, setQty] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!B || !M) return (
    <div style={{ textAlign:'center', padding:'4rem 1rem', color:'var(--m)' }}>
      ⚠️ الطير غير موجود. <a href="/" style={{ color:'var(--g)' }}>رجوع ←</a>
    </div>
  );

  const disc = Math.round((1 - B.price / B.oldPrice) * 100);
  const save = B.oldPrice - B.price;
  const total = B.price * qty;
  const others = BIRD_LIST.filter(x => x.id !== B.id).slice(0, 5);

  const openSheet = () => {
    setSheetOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    document.body.style.overflow = '';
    setName(''); setPhone('');
    setQty(1); setNameErr(false); setPhoneErr(false);
  }, []);

  const submitOrder = useCallback(() => {
    let ok = true;
    if (!name.trim()) { setNameErr(true); ok = false; }
    if (phone.trim().length < 9) { setPhoneErr(true); ok = false; }
    if (!ok) return;

    setLoading(true);

    // 🔥 Fire-and-forget — NO await, never blocks the redirect
    fetch(GSHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name: name.trim(), phone: phone.trim(), product: `${B.name} (x${qty})` }),
    }).catch(() => {});

    // Track FB Pixel Purchase event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', { value: B.price * qty, currency: 'MAD' });
    }

    // Redirect immediately — don't wait for fetch
    router.push(`/thankyou?name=${encodeURIComponent(name.trim())}`);
  }, [name, phone, qty, B, router]);

  return (
    <>
      {/* NAV */}
      <nav style={{ position:'sticky', top:0, zIndex:60, background:'rgba(13,17,23,.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--gb)', padding:'.7rem 1rem', display:'flex', alignItems:'center', gap:'.75rem' }}>
        <button onClick={() => router.back()} style={{ display:'flex', alignItems:'center', gap:'.3rem', background:'var(--d3)', border:'1px solid var(--gb)', color:'var(--m)', padding:'.42rem .85rem', borderRadius:50, fontSize:'.8rem', fontWeight:600 }}>→ رجوع</button>
        <div style={{ flex:1, fontSize:'.88rem', fontWeight:700, textAlign:'center', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color:'var(--m)' }}>{B.name}</div>
        <button onClick={() => { if(navigator.share) navigator.share({title:B.name, url:location.href}); else navigator.clipboard.writeText(location.href); }}
          style={{ background:'var(--d3)', border:'1px solid var(--gb)', padding:'.42rem .75rem', borderRadius:50, fontSize:'.8rem', color:'var(--m)' }}>📤 شارك</button>
      </nav>

      {/* PROOF BAR */}
      <div style={{ background:'linear-gradient(90deg,rgba(34,197,94,.08),rgba(212,175,55,.08))', borderBottom:'1px solid var(--gb)', padding:'.5rem 1rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'1.5rem', flexWrap:'wrap' }}>
        <span style={{ display:'flex', alignItems:'center', gap:'.35rem', fontSize:'.72rem', color:'var(--m)' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block', animation:'blink 1.4s infinite' }}/>
          <strong style={{ color:'var(--t)' }}>{M.viewing}</strong> شخص يشوف هاد الصفحة الآن
        </span>
        <span style={{ fontSize:'.72rem', color:'var(--m)' }}>🏆 <strong style={{ color:'var(--t)' }}>{M.soldToday}</strong> طير بيع اليوم</span>
        <span style={{ fontSize:'.72rem', color:'var(--m)' }}>⭐ <strong style={{ color:'var(--t)' }}>4.9/5</strong> متوسط التقييم</span>
      </div>

      {/* HERO IMAGE */}
      <div style={{ position:'relative', width:'100%', background:'linear-gradient(160deg,var(--d2),var(--d3))', overflow:'hidden' }}>
        <div style={{ position:'relative', width:'100%', maxHeight:420, aspectRatio:'16/9' }}>
          <Image src={B.images[0]} alt={B.name} fill sizes="100vw" style={{ objectFit:'cover' }} priority/>
        </div>
        <div style={{ position:'absolute', top:12, right:12, padding:'.32rem .85rem', borderRadius:50, fontSize:'.7rem', fontWeight:800, color:'#fff', background:B.badgeColor, boxShadow:'0 2px 12px rgba(0,0,0,.3)' }}>{B.badge}</div>
        <div style={{ position:'absolute', bottom:12, right:12, background:'rgba(13,17,23,.85)', backdropFilter:'blur(8px)', border:'1px solid rgba(34,197,94,.3)', color:'var(--green)', padding:'.32rem .8rem', borderRadius:50, fontSize:'.72rem', fontWeight:700, display:'flex', alignItems:'center', gap:'.35rem' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block' }}/>متوفر الآن
        </div>
      </div>

      {/* HOOK */}
      <div style={{ background:'linear-gradient(135deg,rgba(212,175,55,.1),rgba(201,99,42,.08))', borderBottom:'1px solid rgba(212,175,55,.15)', padding:'.85rem 1rem', textAlign:'center' }}>
        <div style={{ fontSize:'.9rem', fontWeight:700, background:'linear-gradient(135deg,#fff,var(--g))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{M.hook}</div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding:'1.25rem 1rem 7rem', maxWidth:720, margin:'0 auto' }}>

        <div style={{ fontSize:'.73rem', fontWeight:700, color:'var(--g)', letterSpacing:'.4px', marginBottom:'.3rem' }}>{B.emoji} {B.type}</div>
        <h1 style={{ fontSize:'clamp(1.5rem,4vw,2rem)', fontWeight:900, lineHeight:1.15, marginBottom:'.6rem' }}>{B.name}</h1>

        {/* RATING */}
        <div style={{ display:'flex', alignItems:'center', gap:'.6rem', flexWrap:'wrap', marginBottom:'1rem', paddingBottom:'1rem', borderBottom:'1px solid var(--gb)' }}>
          <span style={{ color:'#F4D03F', fontSize:'.95rem', letterSpacing:1 }}>⭐⭐⭐⭐⭐</span>
          <span style={{ fontWeight:700, fontSize:'.88rem' }}>{B.rating}</span>
          <span style={{ fontSize:'.78rem', color:'var(--m)' }}>({B.reviews} مراجعة)</span>
          <span style={{ marginRight:'auto', background:'rgba(201,99,42,.2)', color:'#E8834A', padding:'.2rem .6rem', borderRadius:50, fontSize:'.7rem', fontWeight:700 }}>خصم {disc}%</span>
        </div>

        {/* HEADLINE */}
        <div style={{ fontSize:'clamp(1rem,3vw,1.3rem)', fontWeight:900, background:'linear-gradient(135deg,#fff 0%,var(--g) 60%,#E8834A 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1.4, marginBottom:'.9rem' }}>{M.headline}</div>

        {/* EMOTIONAL */}
        <div style={{ background:'linear-gradient(135deg,rgba(212,175,55,.07),rgba(201,99,42,.04))', border:'1px solid rgba(212,175,55,.15)', borderRadius:'var(--r)', padding:'1rem 1.1rem', marginBottom:'1.25rem', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-5, right:12, fontSize:'3.5rem', color:'rgba(212,175,55,.12)', lineHeight:1, pointerEvents:'none' }}>❝</div>
          <div style={{ fontSize:'.88rem', lineHeight:1.9, position:'relative' }}>{M.emotional}</div>
        </div>

        {/* PRICE */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap', background:'var(--d2)', border:'1px solid var(--gb)', borderRadius:'var(--r)', padding:'1rem 1.1rem', marginBottom:'1.25rem' }}>
          <div style={{ display:'flex', flexDirection:'column' }}>
            <span style={{ fontSize:'.78rem', color:'var(--m)', textDecoration:'line-through' }}>{B.oldPrice} درهم</span>
            <span style={{ fontSize:'2rem', fontWeight:900, color:'var(--g)', lineHeight:1 }}>{B.price} <small style={{ fontSize:'.8rem', fontWeight:400 }}>درهم</small></span>
          </div>
          <span style={{ background:'rgba(34,197,94,.12)', border:'1px solid rgba(34,197,94,.25)', color:'var(--green)', padding:'.35rem .8rem', borderRadius:50, fontSize:'.75rem', fontWeight:700 }}>💰 وفرت {save} درهم</span>
          <div style={{ width:'100%', fontSize:'.75rem', color:'var(--m)', borderTop:'1px solid var(--gb)', marginTop:'.6rem', paddingTop:'.6rem' }}>
            💳 أو <span style={{ color:'var(--g)', fontWeight:700 }}>3 دفعات × {Math.ceil(B.price/3)} درهم</span> بدون فائدة
          </div>
        </div>

        {/* URGENCY */}
        <div style={{ borderRadius:'var(--r)', padding:'.75rem 1rem', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'.65rem', background:`${M.urgencyColor}12`, border:`1px solid ${M.urgencyColor}30` }}>
          <span style={{ fontSize:'1.3rem' }}>⚡</span>
          <div style={{ fontSize:'.82rem', fontWeight:700, color:M.urgencyColor, lineHeight:1.5 }}>
            {M.urgency} — الطلب عالي اليوم
            <div style={{ color:'var(--m)', fontWeight:400, fontSize:'.75rem', marginTop:'.15rem' }}>{M.soldToday} بيعو اليوم + {M.viewing} شخص يشوف الآن</div>
          </div>
        </div>

        {/* BENEFITS */}
        <div style={{ fontSize:'.78rem', fontWeight:700, color:'var(--g)', letterSpacing:'.4px', marginBottom:'.75rem', display:'flex', alignItems:'center', gap:'.4rem' }}>
          ✨ ليش هاد الطير خاصك
          <span style={{ flex:1, height:1, background:'var(--gb)', display:'block' }}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'.55rem', marginBottom:'1.5rem' }}>
          {M.benefits.map((b, i) => {
            const [em, ...rest] = b.split(' ');
            return (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'.75rem', background:'var(--d2)', border:'1px solid var(--gb)', borderRadius:'var(--r)', padding:'.8rem .9rem' }}>
                <span style={{ fontSize:'1.1rem', flexShrink:0, marginTop:1 }}>{em}</span>
                <span style={{ fontSize:'.85rem', lineHeight:1.5 }}>{rest.join(' ')}</span>
              </div>
            );
          })}
        </div>

        {/* SPECS */}
        <div style={{ fontSize:'.78rem', fontWeight:700, color:'var(--g)', letterSpacing:'.4px', marginBottom:'.75rem', display:'flex', alignItems:'center', gap:'.4rem' }}>
          📋 المواصفات<span style={{ flex:1, height:1, background:'var(--gb)', display:'block' }}/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'.55rem', marginBottom:'1.5rem' }}>
          {B.specs.map((s, i) => (
            <div key={i} style={{ background:'var(--d2)', border:'1px solid var(--gb)', borderRadius:'var(--r)', padding:'.7rem .8rem' }}>
              <div style={{ fontSize:'.65rem', color:'var(--m)', marginBottom:'.2rem', fontWeight:600 }}>{s.k}</div>
              <div style={{ fontSize:'.82rem', fontWeight:700 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* GUARANTEE */}
        <div style={{ background:'rgba(34,197,94,.12)', border:'1px solid rgba(34,197,94,.2)', borderRadius:'var(--r)', padding:'.85rem 1rem', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'.75rem' }}>
          <span style={{ fontSize:'1.8rem', flexShrink:0 }}>🛡️</span>
          <div>
            <h4 style={{ fontSize:'.85rem', fontWeight:700, color:'var(--green)', marginBottom:'.15rem' }}>ضمان مضمون 100%</h4>
            <p style={{ fontSize:'.78rem', color:'var(--m)', lineHeight:1.5 }}>{M.guarantee}</p>
          </div>
        </div>

        {/* TRUST PILLS */}
        <div style={{ display:'flex', gap:'.45rem', flexWrap:'wrap', marginBottom:'1.75rem' }}>
          {['🏥 فحص بيطري','🚀 توصيل 24 ساعة','📞 دعم دائم','🔒 دفع آمن','🇲🇦 مغربي 100%'].map(p => (
            <span key={p} style={{ background:'var(--d3)', border:'1px solid var(--gb)', borderRadius:50, padding:'.32rem .75rem', fontSize:'.72rem', color:'var(--m)', display:'inline-flex', alignItems:'center', gap:'.3rem' }}>{p}</span>
          ))}
        </div>

        <div style={{ height:1, background:'var(--gb)', margin:'1.5rem 0' }}/>

        {/* REVIEWS */}
        <div style={{ fontSize:'.78rem', fontWeight:700, color:'var(--g)', letterSpacing:'.4px', marginBottom:'.75rem', display:'flex', alignItems:'center', gap:'.4rem' }}>
          💬 آراء الزبائن<span style={{ flex:1, height:1, background:'var(--gb)', display:'block' }}/>
        </div>
        <div style={{ background:'var(--d2)', border:'1px solid var(--gb)', borderRadius:'var(--r)', padding:'1rem', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'1rem' }}>
          <div style={{ fontSize:'2.5rem', fontWeight:900, color:'var(--g)', lineHeight:1 }}>{B.rating}</div>
          <div>
            <div style={{ color:'#F4D03F', fontSize:'1rem', letterSpacing:2 }}>⭐⭐⭐⭐⭐</div>
            <div style={{ fontSize:'.72rem', color:'var(--m)' }}>من {B.reviews} تقييم موثق</div>
          </div>
        </div>
        {M.reviews.map((r, i) => (
          <div key={i} style={{ background:'var(--d2)', border:'1px solid var(--gb)', borderRadius:'var(--r)', padding:'.9rem 1rem', marginBottom:'.65rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'.65rem', marginBottom:'.55rem' }}>
              <div style={{ width:34, height:34, borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg,var(--g),var(--terra))', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'.95rem', color:'var(--d)' }}>{r.name[0]}</div>
              <div>
                <div style={{ fontSize:'.85rem', fontWeight:700 }}>{r.name} — <span style={{ color:'var(--m)', fontSize:'.75rem' }}>{r.city}</span></div>
                <div style={{ fontSize:'.7rem', color:'var(--m)' }}>{r.ago}</div>
              </div>
              <div style={{ color:'#F4D03F', fontSize:'.8rem', marginRight:'auto' }}>⭐⭐⭐⭐⭐</div>
            </div>
            <div style={{ fontSize:'.83rem', lineHeight:1.7 }}>"{r.text}"</div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'.25rem', fontSize:'.68rem', color:'var(--green)', marginTop:'.4rem' }}>✅ مشتري موثق</div>
          </div>
        ))}

        <div style={{ height:1, background:'var(--gb)', margin:'1.5rem 0' }}/>

        {/* ALSO VIEWED */}
        <div style={{ fontSize:'.78rem', fontWeight:700, color:'var(--g)', letterSpacing:'.4px', marginBottom:'.75rem', display:'flex', alignItems:'center', gap:'.4rem' }}>
          🦜 طيور أخرى قد تعجبك<span style={{ flex:1, height:1, background:'var(--gb)', display:'block' }}/>
        </div>
        <div style={{ display:'flex', gap:'.75rem', overflowX:'auto', paddingBottom:'.5rem', scrollbarWidth:'none' }}>
          {others.map(b => (
            <a key={b.id} href={`/product/${b.id}`} style={{ flexShrink:0, width:130, background:'var(--d2)', border:'1px solid var(--gb)', borderRadius:'var(--r)', overflow:'hidden', color:'inherit', display:'block' }}>
              <div style={{ position:'relative', height:90, overflow:'hidden' }}>
                <Image src={b.images[0]} alt={b.name} fill sizes="130px" style={{ objectFit:'cover' }}/>
              </div>
              <div style={{ padding:'.55rem .6rem' }}>
                <div style={{ fontSize:'.72rem', fontWeight:700, marginBottom:'.2rem', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>{b.name}</div>
                <div style={{ fontSize:'.78rem', fontWeight:900, color:'var(--g)' }}>{b.price} درهم</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* STICKY BUY BAR */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:50, background:'rgba(13,17,23,.97)', backdropFilter:'blur(20px)', borderTop:'1px solid var(--gb)', padding:'.9rem 1rem', display:'flex', alignItems:'center', gap:'.85rem' }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          <span style={{ fontSize:'.68rem', color:'var(--m)', textDecoration:'line-through' }}>{B.oldPrice} درهم</span>
          <span style={{ fontSize:'1.25rem', fontWeight:900, color:'var(--g)', lineHeight:1 }}>{B.price} <small style={{ fontSize:'.65rem', fontWeight:400 }}>درهم</small></span>
        </div>
        <button onClick={openSheet} style={{ flex:1, background:'linear-gradient(135deg,var(--g),var(--terra))', color:'#0D1117', border:'none', borderRadius:50, fontFamily:'inherit', fontWeight:900, fontSize:'1rem', padding:'.85rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'.4rem' }}>
          🛒 اشتري الآن
        </button>
      </div>

      {/* CHECKOUT SHEET */}
      {sheetOpen && (
        <div onClick={e => { if(e.target === e.currentTarget) closeSheet(); }}
          style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,.82)', backdropFilter:'blur(8px)', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
          <div style={{ background:'var(--d2)', borderTop:'1px solid var(--gb)', borderRadius:'22px 22px 0 0', width:'100%', maxWidth:430, maxHeight:'96vh', overflowY:'auto', padding:'1.25rem 1.1rem 2rem' }}>
            <div style={{ width:36, height:4, background:'var(--d3)', borderRadius:2, margin:'0 auto 1.1rem' }}/>
            <div style={{ fontSize:'1.15rem', fontWeight:900, marginBottom:'.2rem' }}>🛒 أكمل طلبك</div>
            <div style={{ fontSize:'.78rem', color:'var(--m)', marginBottom:'1.1rem' }}>أدخل معلوماتك — نتصل بك لتأكيد الطلب</div>

            {/* ORDER PREVIEW */}
            <div style={{ display:'flex', alignItems:'center', gap:'.8rem', background:'var(--d3)', border:'1px solid var(--gb)', borderRadius:'var(--r)', padding:'.8rem', marginBottom:'1.1rem' }}>
              <div style={{ position:'relative', width:50, height:50, borderRadius:10, overflow:'hidden', flexShrink:0 }}>
                <Image src={B.images[0]} alt={B.name} fill style={{ objectFit:'cover' }}/>
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:'.85rem', marginBottom:'.15rem' }}>{B.name}</div>
                <div style={{ color:'var(--g)', fontWeight:900, fontSize:'.9rem' }}>{B.price} × {qty} = {total} درهم</div>
              </div>
            </div>

            {/* QTY */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
              <span style={{ fontSize:'.8rem', fontWeight:700, color:'var(--g)' }}>الكمية</span>
              <div style={{ display:'flex', alignItems:'center', gap:'.6rem' }}>
                <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ background:'var(--d3)', border:'1.5px solid var(--gb)', color:'var(--t)', width:32, height:32, borderRadius:'50%', fontSize:'1rem', fontWeight:700 }}>−</button>
                <span style={{ fontSize:'.95rem', fontWeight:900, minWidth:22, textAlign:'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} style={{ background:'var(--d3)', border:'1.5px solid var(--gb)', color:'var(--t)', width:32, height:32, borderRadius:'50%', fontSize:'1rem', fontWeight:700 }}>+</button>
              </div>
            </div>

            {/* FORM */}
            <label style={{ display:'block', fontSize:'.78rem', fontWeight:700, color:'var(--g)', marginBottom:'.4rem' }}>👤 الاسم الكامل *</label>
            <input type="text" value={name} onChange={e => { setName(e.target.value); setNameErr(false); }} placeholder="مثلاً: محمد العلوي"
              style={{ width:'100%', background:'var(--d3)', border:`1.5px solid ${nameErr ? 'var(--red)' : 'var(--gb)'}`, borderRadius:12, color:'var(--t)', fontFamily:'inherit', fontSize:'.92rem', padding:'.78rem .95rem', outline:'none', marginBottom:'.85rem', boxShadow: nameErr ? '0 0 0 3px rgba(255,107,107,.12)' : 'none' }}/>

            <label style={{ display:'block', fontSize:'.78rem', fontWeight:700, color:'var(--g)', marginBottom:'.4rem' }}>📱 رقم الهاتف *</label>
            <input type="tel" value={phone} onChange={e => { setPhone(e.target.value); setPhoneErr(false); }} placeholder="06XXXXXXXX" inputMode="tel"
              style={{ width:'100%', background:'var(--d3)', border:`1.5px solid ${phoneErr ? 'var(--red)' : 'var(--gb)'}`, borderRadius:12, color:'var(--t)', fontFamily:'inherit', fontSize:'.92rem', padding:'.78rem .95rem', outline:'none', marginBottom:'.85rem', boxShadow: phoneErr ? '0 0 0 3px rgba(255,107,107,.12)' : 'none' }}/>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(212,175,55,.12)', border:'1px solid rgba(212,175,55,.2)', borderRadius:'var(--r)', padding:'.85rem 1rem', marginBottom:'1.1rem' }}>
              <span style={{ fontSize:'.88rem', color:'var(--m)' }}>المجموع الكلي</span>
              <strong style={{ fontSize:'1.2rem', fontWeight:900, color:'var(--g)' }}>{total} درهم</strong>
            </div>

            <button onClick={submitOrder} disabled={loading}
              style={{ width:'100%', background:'linear-gradient(135deg,var(--g),var(--terra))', color:'#0D1117', border:'none', borderRadius:50, fontFamily:'inherit', fontWeight:900, fontSize:'1rem', padding:'.95rem', opacity: loading ? .6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? '⏳ جاري الإرسال...' : '✅ تأكيد الطلب الآن'}
            </button>
            <div style={{ textAlign:'center', fontSize:'.68rem', color:'var(--m)', marginTop:'.65rem' }}>🔒 معلوماتك آمنة 100% — نتصل بك خلال ساعة</div>
          </div>
        </div>
      )}

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}`}</style>
    </>
  );
}
