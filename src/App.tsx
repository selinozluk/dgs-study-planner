import { useState } from 'react';
import { generatePlan } from './lib/gemini';
import { saveToCloud } from './lib/firebase';
import './App.css';

function App() {
  const [form, setForm] = useState({ ad: '', hedef: '', konular: '' });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!form.ad || !form.hedef) return alert("Lütfen alanları doldur!");
    setLoading(true);
    try {
      const plan = await generatePlan(form.ad, form.hedef, form.konular);
      setResult(plan);
      await saveToCloud({ ...form, plan });
    } catch (e) { alert("Sistem hatası!"); }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 style={{textAlign: 'center'}}>🎯 DGS Ders Programı Planlayıcısı</h1>
      <p style={{textAlign: 'center', color: '#94a3b8', marginBottom: '20px'}}>İstediğiniz Üniversiteye Yönelik Çalışma Programı</p>
      
      <div className="input-group">
        <input placeholder="İsminiz" onChange={e => setForm({...form, ad: e.target.value})} />
        <input placeholder="Hedef Üniversite" onChange={e => setForm({...form, hedef: e.target.value})} />
        <textarea placeholder="Çalışmak istediğiniz konular..." rows={3} onChange={e => setForm({...form, konular: e.target.value})} />
        <button onClick={handleAction} disabled={loading}>
          {loading ? "🚀 Plan Hazırlanıyor..." : "Haftalık Tablo Oluştur ve Kaydet"}
        </button>
      </div>

      {result && (
        <div className="result-box">
          <h3 style={{color: '#818cf8', marginBottom: '15px'}}>📅 Kişisel Çalışma Çizelgen:</h3>
          <div className="table-container" dangerouslySetInnerHTML={{ __html: result }} />
        </div>
      )}
    </div>
  );
}
export default App;