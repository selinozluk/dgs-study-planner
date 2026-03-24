import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
// generatePlan'ın doğru import edildiğinden emin ol
import { generatePlan } from './lib/gemini';
import { saveToCloud } from './lib/firebase';
import './App.css';

function App() {
  const [form, setForm] = useState({ ad: '', hedef: '', konular: '' });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const vercelUrl = "https://dgs-study-planner.vercel.app";

  const handleAction = async () => {
    // İsim ve Hedef kontrolü
    if (!form.ad.trim() || !form.hedef.trim()) {
      return alert("Lütfen isim ve hedef alanlarını doldurun!");
    }

    setLoading(true);
    try {
      // gemini.ts'deki fonksiyonu çağırıyoruz
      const plan = await generatePlan(form.ad, form.hedef, form.konular);
      setResult(plan);
      
      // Firebase kaydı
      try {
        await saveToCloud({ ...form, plan, date: new Date().toISOString() });
      } catch (e) {
        console.log("Bulut kaydı başarısız ama plan oluşturuldu.");
      }

    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu, lütfen sayfayı yenileyip tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header-section">
        <h1>DGS Çalışma Programı</h1>
        <p className="subtitle">Kişisel Eğitim Koçu</p>
      </div>

      <div className="form-group">
        <input 
          placeholder="İsminiz" 
          value={form.ad}
          onChange={e => setForm({...form, ad: e.target.value})} 
        />
        <input 
          placeholder="Hedef Üniversite / Bölüm" 
          value={form.hedef}
          onChange={e => setForm({...form, hedef: e.target.value})} 
        />
        <textarea 
          placeholder="Zayıf olduğunuz konuları buraya yazın" 
          rows={3} 
          value={form.konular}
          onChange={e => setForm({...form, konular: e.target.value})} 
        />
        <button 
          onClick={handleAction} 
          disabled={loading}
        >
          {loading ? "🚀 Plan Hazırlanıyor..." : "7 Günlük Plan Oluştur"}
        </button>
      </div>

      {result && (
        <div className="result-area">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">7 Gün</div>
              <div className="stat-label">Süre</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">~700</div>
              <div className="stat-label">Soru Hedefi</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">%94</div>
              <div className="stat-label">Verimlilik</div>
            </div>
          </div>

          <div className="result-box">
             <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>

          <div className="qr-section">
            <p className="qr-text">PROGRAMI CEBİNE AL</p>
            <QRCodeSVG value={`${vercelUrl}/?user=${encodeURIComponent(form.ad)}`} size={120} />
            <span className="qr-subtext">Okut ve mobilden de eriş</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;