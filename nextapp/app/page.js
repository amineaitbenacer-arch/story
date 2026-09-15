'use client';
import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BIRD_LIST } from '../lib/birds';

const FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'singing', label: '🎵 غناء' },
  { id: 'parrot', label: '🦜 ببغاء' },
  { id: 'small', label: '🐦 صغير' },
  { id: 'premium', label: '👑 بريميوم' },
];

const styles = {
  nav: { position:'sticky', top:0, zIndex:100, background:'rgba(13,17,23,.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--gb)', padding:'.75rem 1rem', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'.75rem' },
  logo: { fontSize:'1.05rem', fontWeight:900, color:'var(--g)' },
  searchWrap: { flex:1, maxWidth:300, background:'var(--d3)', border:'1px solid var(--gb)', borderRadius:50, display:'flex', alignItems:'center', gap:'.5rem', padding:'.4rem .85rem' },
  searchInput: { background:'none', border:'none', color:'var(--t)', fontFamily:'inherit', fontSize:'.85rem', outline:'none', width:'100%' },
  hero: { background:'linear-gradient(135deg,#0D1117 0%,rgba(14,124,123,.25) 50%,#0D1117 100%)', padding:'2rem 1rem 1.75rem', textAlign:'center' },
  h1: { fontSize:'clamp(1.7rem,5vw,2.6rem)', fontWeight:900, marginBottom:'.35rem' },
  heroP: { color:'var(--m)', fontSize:'.88rem', marginBottom:'1.1rem' },
  stats: { display:'flex', justifyContent:'center', gap:'1.25rem', flexWrap:'wrap' },
  stat: { textAlign:'center' },
  statNum: { display:'block', fontSize:'1.2rem', fontWeight:900, color:'var(--g)' },
  statLabel: { fontSize:'.7rem', color:'var(--m)' },
  filtersWrap: { display:'flex', gap:'.5rem', overflowX:'auto', padding:'.8rem 1rem', scrollbarWidth:'none', borderBottom:'1px solid var(--gb)' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))', gap:'.8rem', padding:'.9rem' },
  empty: { textAlign:'center', padding:'4rem 1rem', color:'var(--m)' },
  footer: { padding:'1.75rem 1rem', textAlign:'center', borderTop:'1px solid var(--gb)', color:'var(--m)', fontSize:'.78rem' },
};

function BirdCard({ bird }) {
  const disc = Math.round((1 - bird.price / bird.oldPrice) * 100);
  return (
    <Link href={`/product/${bird.id}`} style={{ background:'var(--d2)', border:'1px solid var(--gb)', borderRadius:14, overflow:'hidden', display:'block', color:'inherit', transition:'transform .25s,box-shadow .25s,border-color .25s', WebkitTapHighlightColor:'transparent' }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='var(--g)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(0,0,0,.35)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='var(--gb)'; e.currentTarget.style.boxShadow=''; }}
    >
      <div style={{ position:'relative', paddingTop:'72%', overflow:'hidden', background:'var(--d3)' }}>
        <Image src={bird.images[0]} alt={bird.name} fill sizes="(max-width:480px) 50vw,(max-width:768px) 33vw,25vw" style={{ objectFit:'cover' }} priority={false}/>
        <div style={{ position:'absolute', top:7, right:7, padding:'.18rem .55rem', borderRadius:50, fontSize:'.6rem', fontWeight:800, color:'#fff', background:bird.badgeColor }}>{bird.badge}</div>
      </div>
      <div style={{ padding:'.85rem' }}>
        <div style={{ fontSize:'.66rem', fontWeight:700, color:'var(--g)', marginBottom:'.18rem' }}>{bird.emoji} {bird.type}</div>
        <div style={{ fontSize:'.92rem', fontWeight:900, marginBottom:'.25rem', lineHeight:1.3 }}>{bird.name}</div>
        <div style={{ fontSize:'.73rem', color:'var(--m)', marginBottom:'.55rem', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', lineHeight:1.5 }}>{bird.shortDesc}</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', flexDirection:'column' }}>
            <span style={{ fontSize:'.66rem', color:'var(--m)', textDecoration:'line-through' }}>{bird.oldPrice} درهم</span>
            <span style={{ fontSize:'1.05rem', fontWeight:900, color:'var(--g)' }}>{bird.price} <small style={{ fontSize:'.62rem', fontWeight:400 }}>درهم</small></span>
          </div>
          <div style={{ background:'var(--g)', color:'#0D1117', borderRadius:'50%', width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.85rem', fontWeight:900 }}>←</div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BIRD_LIST.filter(b =>
      (active === 'all' || b.category.includes(active)) &&
      (!q || b.name.includes(q) || b.tags.some(t => t.includes(q)) || b.type.includes(q))
    );
  }, [active, query]);

  const handleSearch = useCallback(e => setQuery(e.target.value), []);

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.logo}>🦜 بيبيات الأطلس</div>
        <div style={styles.searchWrap}>
          <span>🔍</span>
          <input type="text" placeholder="ابحث عن طير..." style={styles.searchInput} value={query} onChange={handleSearch} autoComplete="off"/>
        </div>
      </nav>

      <div style={styles.hero}>
        <h1 style={styles.h1}>
          <span style={{ background:'linear-gradient(135deg,#fff,var(--g),#C9632A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>بيبيات الأطلس</span>
        </h1>
        <p style={styles.heroP}>متجر الطيور الأول بالمغرب 🇲🇦 — جودة مضمونة وأسعار مناسبة</p>
        <div style={styles.stats}>
          {[['800+','زبون سعيد'],['8','أنواع'],['5★','تقييم'],['100%','مضمون']].map(([n,l]) => (
            <div key={l} style={styles.stat}><strong style={styles.statNum}>{n}</strong><span style={styles.statLabel}>{l}</span></div>
          ))}
        </div>
      </div>

      <div style={styles.filtersWrap}>
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setActive(f.id)}
            style={{ background: active === f.id ? 'var(--g)' : 'var(--d3)', border: active === f.id ? '1px solid var(--g)' : '1px solid var(--gb)', color: active === f.id ? '#0D1117' : 'var(--m)', padding:'.38rem .95rem', borderRadius:50, fontSize:'.78rem', fontWeight:700, whiteSpace:'nowrap', transition:'background .2s,color .2s' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filtered.length === 0
          ? <div style={{ ...styles.empty, gridColumn:'1/-1' }}>😔 ما كاين حتى طير بهاد البحث</div>
          : filtered.map(b => <BirdCard key={b.id} bird={b}/>)
        }
      </div>

      <footer style={styles.footer}>
        <strong style={{ color:'var(--g)' }}>بيبيات الأطلس</strong> — صنع بالمغرب 🇲🇦 بكل حب 💛
      </footer>
    </>
  );
}
