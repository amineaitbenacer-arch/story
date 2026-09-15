'use client';
import { useState, useEffect } from 'react';

const GSHEET_URL = 'https://script.google.com/macros/s/AKfycbyz4vKuA8Is25GCKCtWvB1SDoBlGd3Qyp-2ucm6lxnbKovrvfTmIHmywDROaB8gG0BG/exec';

export default function AdminPage() {
  const [gsheetUrl, setGsheetUrl] = useState(GSHEET_URL);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('gsheet_webhook_url') || GSHEET_URL;
    setGsheetUrl(stored);
    if (!localStorage.getItem('gsheet_webhook_url')) {
      localStorage.setItem('gsheet_webhook_url', GSHEET_URL);
    }
  }, []);

  const saveUrl = () => {
    if (!gsheetUrl.trim()) return;
    localStorage.setItem('gsheet_webhook_url', gsheetUrl.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      await fetch(gsheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name: 'اختبار تجريبي (سعيد العلوي)', phone: '0661234567', product: 'الكناري الذهبي (x1)' }),
      });
      setTestResult('success');
    } catch {
      setTestResult('error');
    } finally {
      setTesting(false);
    }
  };

  const scriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById('1hvHVA54hNrJWEJqpCxIyfteZQqBGQFMyT5bbfUOKfZI').getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var name = data.name || data.customer_name || "—";
    var phone = data.phone || data.customer_phone || "—";
    var product = data.product || "—";
    sheet.appendRow([name, "'" + phone, product]);
    return ContentService.createTextOutput(JSON.stringify({status:"success"})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status:"error",message:err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const isConnected = gsheetUrl && gsheetUrl.includes('script.google.com');

  return (
    <div style={{ minHeight:'100vh', background:'#0D1117', color:'#E6EDF3', direction:'rtl', padding:'2rem 1rem', fontFamily:'inherit' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>

        {/* HEADER */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,.1)', paddingBottom:'1.5rem', marginBottom:'2rem' }}>
          <h1 style={{ color:'#D4AF37', fontWeight:900, fontSize:'1.5rem' }}>👑 لوحة التحكم — بيبيات الأطلس</h1>
          <a href="/" style={{ color:'#E6EDF3', textDecoration:'none', background:'#21262D', padding:'.5rem 1rem', borderRadius:8, fontSize:'.9rem' }}>🏠 رجوع للمتجر</a>
        </div>

        {/* STATS */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
          {[['🟢', isConnected ? 'مربوط بنجاح' : 'غير مربوط', isConnected ? '#22C55E' : '#D4AF37'],['📊','Google Sheets','#D4AF37'],['🦜','بيبيات الأطلس','#D4AF37']].map(([icon, label, color]) => (
            <div key={label} style={{ background:'#161B22', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:'1.5rem', textAlign:'center' }}>
              <div style={{ fontSize:'1.8rem', marginBottom:'.5rem' }}>{icon}</div>
              <div style={{ color, fontWeight:700, fontSize:'.9rem' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* GOOGLE SHEETS SECTION */}
        <div style={{ background:'#161B22', border:'1px solid rgba(255,255,255,.08)', borderRadius:16, padding:'1.5rem', marginBottom:'2rem' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <h2 style={{ color:'#D4AF37', fontSize:'1.3rem', marginBottom:'.25rem' }}>📊 ربط المتجر بـ Google Sheets</h2>
              <p style={{ color:'#8B949E', fontSize:'.88rem' }}>كاع الطلبات كيدوزو تلقائياً لشيت ديالك لحظة بلحظة</p>
            </div>
            <div style={{ background: isConnected ? 'rgba(34,197,94,.15)' : 'rgba(212,175,55,.15)', color: isConnected ? '#22C55E' : '#D4AF37', padding:'.5rem 1rem', borderRadius:50, fontWeight:700, fontSize:'.85rem' }}>
              {isConnected ? '🟢 مفعل ومربوط' : '⏳ غير مربوط'}
            </div>
          </div>

          <label style={{ display:'block', color:'#D4AF37', fontWeight:700, marginBottom:'.5rem', fontSize:'.9rem' }}>🔗 رابط Google Webhook URL</label>
          <div style={{ display:'flex', gap:'.75rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
            <input type="url" value={gsheetUrl} onChange={e => setGsheetUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              style={{ flex:1, minWidth:280, background:'#21262D', border:'1.5px solid rgba(255,255,255,.08)', color:'#E6EDF3', padding:'.8rem 1rem', borderRadius:10, outline:'none', fontSize:'.88rem', fontFamily:'monospace' }}/>
            <button onClick={saveUrl} style={{ background:'#D4AF37', color:'#0D1117', border:'none', padding:'.8rem 1.5rem', borderRadius:10, fontWeight:800, fontSize:'.9rem', fontFamily:'inherit' }}>
              {saved ? '✅ تم الحفظ!' : '💾 حفظ الرابط'}
            </button>
            <button onClick={testConnection} disabled={testing} style={{ background:'#21262D', border:'1px solid rgba(255,255,255,.08)', color:'#E6EDF3', padding:'.8rem 1.5rem', borderRadius:10, fontWeight:700, fontSize:'.9rem', fontFamily:'inherit', opacity: testing ? .6 : 1 }}>
              {testing ? '⏳ جاري الإرسال...' : '🧪 تجربة الإرسال'}
            </button>
          </div>

          {testResult === 'success' && (
            <div style={{ background:'rgba(34,197,94,.1)', border:'1px solid rgba(34,197,94,.3)', borderRadius:10, padding:'1rem', marginBottom:'1rem', color:'#22C55E', fontSize:'.88rem' }}>
              ✅ تم إرسال طلب تجريبي! افتح الشيت ديالك وشوف السطر الجديد.
            </div>
          )}

          {/* CODE SNIPPET */}
          <div style={{ background:'#21262D', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:'1.25rem' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
              <h3 style={{ color:'#E6EDF3', fontSize:'1rem' }}>📝 كود Google Apps Script</h3>
              <button onClick={() => { navigator.clipboard.writeText(scriptCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                style={{ background:'#D4AF37', color:'#0D1117', border:'none', padding:'.4rem 1rem', borderRadius:6, fontWeight:700, fontSize:'.85rem', fontFamily:'inherit' }}>
                {copied ? '✅ تم النسخ!' : '📋 نسخ الكود'}
              </button>
            </div>
            <ol style={{ color:'#8B949E', lineHeight:1.9, marginRight:'1.2rem', fontSize:'.88rem', marginBottom:'1rem' }}>
              <li>افتح Google Sheet وسمي الهيدرز: <code style={{ color:'#D4AF37' }}>name | phone | product</code></li>
              <li>من القائمة: <strong style={{ color:'#fff' }}>Extensions ➔ Apps Script</strong></li>
              <li>امسح الكود القديم وحط هاد الكود (اضغط نسخ فوق)</li>
              <li>اضغط <strong style={{ color:'#fff' }}>Deploy ➔ New Deployment ➔ Web App</strong></li>
              <li>في <em>Who has access</em> اختر <strong style={{ color:'#D4AF37' }}>Anyone</strong> ثم Deploy</li>
              <li>انسخ الرابط الناتج وحطو فالخانة الفوق ✅</li>
            </ol>
            <pre style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,.08)', color:'#22C55E', padding:'1rem', borderRadius:8, fontSize:'.78rem', overflowX:'auto', direction:'ltr', textAlign:'left', fontFamily:'monospace', lineHeight:1.5 }}>
              {scriptCode}
            </pre>
          </div>
        </div>

        {/* SHEET LINK */}
        <div style={{ background:'#161B22', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:'1.25rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <div style={{ fontWeight:700, marginBottom:'.25rem' }}>📋 Google Sheet ديالك</div>
            <div style={{ color:'#8B949E', fontSize:'.85rem' }}>شوف كاع الطلبات والليدز هنا</div>
          </div>
          <a href="https://docs.google.com/spreadsheets/d/1hvHVA54hNrJWEJqpCxIyfteZQqBGQFMyT5bbfUOKfZI/edit" target="_blank" rel="noopener noreferrer"
            style={{ background:'linear-gradient(135deg,#D4AF37,#C9632A)', color:'#0D1117', borderRadius:10, fontWeight:800, fontSize:'.9rem', padding:'.75rem 1.5rem', textDecoration:'none' }}>
            📊 فتح Google Sheet ←
          </a>
        </div>

      </div>
    </div>
  );
}
