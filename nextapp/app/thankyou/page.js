'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

function ThankYouContent() {
  const params = useSearchParams();
  const name = params.get('name') || 'صديقنا';
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setShow(true), 100);
    // FB Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase');
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, rgba(14,124,123,.25) 0%, #0D1117 60%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem', direction: 'rtl', overflow: 'hidden', position: 'relative'
    }}>

      {/* Background sparkles */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        {['top:15%;right:10%','top:25%;left:8%','top:60%;right:5%','top:70%;left:15%','top:40%;right:20%'].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute', [pos.split(';')[0].split(':')[0]]: pos.split(';')[0].split(':')[1],
            [pos.split(';')[1].split(':')[0]]: pos.split(';')[1].split(':')[1],
            width: 6, height: 6, borderRadius: '50%', background: '#D4AF37',
            opacity: 0.3, animation: `twinkle ${1.5 + i * 0.3}s ease-in-out infinite alternate`
          }}/>
        ))}
      </div>

      <div style={{
        maxWidth: 480, width: '100%', textAlign: 'center',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity .6s ease, transform .6s ease'
      }}>

        {/* Success icon */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%', margin: '0 auto 1.5rem',
          background: 'linear-gradient(135deg,rgba(34,197,94,.2),rgba(34,197,94,.05))',
          border: '2px solid rgba(34,197,94,.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.8rem',
          animation: show ? 'popIn .6s cubic-bezier(.34,1.56,.64,1) forwards' : 'none'
        }}>🎉</div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(1.6rem,5vw,2.2rem)', fontWeight: 900,
          background: 'linear-gradient(135deg,#22C55E,#D4AF37)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '.75rem'
        }}>تم استلام طلبك! 🦜</h1>

        {/* Message */}
        <div style={{
          background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 16, padding: '1.5rem', marginBottom: '1.75rem'
        }}>
          <p style={{ fontSize: '1.05rem', color: '#E6EDF3', lineHeight: 1.9, marginBottom: '1rem' }}>
            مرحبا <strong style={{ color: '#D4AF37' }}>{name}</strong> 👋<br/>
            وصلنا طلبك بنجاح ✅
          </p>
          <div style={{
            background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)',
            borderRadius: 12, padding: '1rem',
            fontSize: '.92rem', color: '#22C55E', fontWeight: 700, lineHeight: 1.8
          }}>
            📞 غادي نتصلو بيك<br/>
            <span style={{ color: '#D4AF37', fontSize: '1.1rem' }}>خلال ساعة واحدة بإذن الله ✨</span><br/>
            <span style={{ color: '#8B949E', fontSize: '.82rem', fontWeight: 400 }}>لتأكيد الطلب وترتيب التوصيل</span>
          </div>
        </div>

        {/* Guarantees */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem', marginBottom: '2rem' }}>
          {[
            ['🏥', 'فحص بيطري', 'صحة الطير مضمونة'],
            ['🚀', 'توصيل سريع', 'لباب الدار ديالك'],
            ['📞', 'دعم دائم', 'معاك بعد الشراء'],
            ['🛡️', 'ضمان كامل', 'أو الاسترجاع الكامل'],
          ].map(([icon, title, sub]) => (
            <div key={title} style={{
              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 14, padding: '1rem .85rem', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '.4rem' }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: '.85rem', color: '#E6EDF3', marginBottom: '.15rem' }}>{title}</div>
              <div style={{ fontSize: '.72rem', color: '#8B949E' }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          background: 'linear-gradient(135deg,#D4AF37,#C9632A)',
          color: '#0D1117', borderRadius: 50, fontWeight: 900,
          fontSize: '.95rem', padding: '.9rem 2.5rem', textDecoration: 'none',
          boxShadow: '0 8px 32px rgba(212,175,55,.3)',
          transition: 'transform .2s, box-shadow .2s'
        }}>
          🦜 متابعة التسوق
        </Link>

        <p style={{ marginTop: '1.5rem', fontSize: '.78rem', color: '#8B949E' }}>
          بيبيات الأطلس 🇲🇦 — شكراً على ثقتك فينا
        </p>
      </div>

      <style>{`
        @keyframes popIn { from { transform:scale(0) rotate(-15deg); } to { transform:scale(1) rotate(0); } }
        @keyframes twinkle { from { opacity:.15; transform:scale(.8); } to { opacity:.5; transform:scale(1.2); } }
      `}</style>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0D1117', color:'#8B949E', fontSize:'1rem' }}>
        ⏳ جاري التحميل...
      </div>
    }>
      <ThankYouContent/>
    </Suspense>
  );
}
