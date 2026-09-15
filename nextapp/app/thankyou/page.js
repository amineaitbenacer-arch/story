'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function ThankYouContent() {
  const params = useSearchParams();
  const name = params.get('name') || 'صديقنا';

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#0D1117 0%,rgba(14,124,123,.2) 50%,#0D1117 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem', direction:'rtl' }}>
      <div style={{ maxWidth:480, width:'100%', textAlign:'center' }}>
        <div style={{ fontSize:'4rem', marginBottom:'1rem', animation:'popIn .6s cubic-bezier(.34,1.56,.64,1)' }}>🎉</div>
        <h1 style={{ fontSize:'clamp(1.5rem,4vw,2rem)', fontWeight:900, color:'#22C55E', marginBottom:'.75rem' }}>تم استلام طلبك!</h1>
        <p style={{ fontSize:'1rem', color:'#8B949E', lineHeight:1.8, marginBottom:'2rem' }}>
          شكراً <strong style={{ color:'#E6EDF3' }}>{name}</strong>!<br/>
          سنتصل بك <strong style={{ color:'#D4AF37' }}>خلال ساعة واحدة بإذن الله ✨</strong><br/>
          للتأكيد وترتيب التوصيل.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.75rem', marginBottom:'2rem' }}>
          {[['🏥','فحص بيطري'],['🚀','توصيل سريع'],['📞','دعم مستمر'],['🛡️','ضمان كامل']].map(([icon, label]) => (
            <div key={label} style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', borderRadius:12, padding:'.85rem', fontSize:'.85rem', color:'#8B949E' }}>
              <div style={{ fontSize:'1.5rem', marginBottom:'.35rem' }}>{icon}</div>
              {label}
            </div>
          ))}
        </div>
        <Link href="/" style={{ display:'inline-block', background:'linear-gradient(135deg,#D4AF37,#C9632A)', color:'#0D1117', borderRadius:50, fontWeight:900, fontSize:'.95rem', padding:'.85rem 2rem', textDecoration:'none' }}>
          🦜 متابعة التسوق
        </Link>
      </div>
      <style>{`@keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}`}</style>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'#8B949E' }}>⏳ جاري التحميل...</div>}>
      <ThankYouContent/>
    </Suspense>
  );
}
