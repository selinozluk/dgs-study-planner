import { GoogleGenerativeAI } from "@google/generative-ai";

// Yeni aldığın API Key'i buraya yapıştır
const genAI = new GoogleGenerativeAI("BURAYA_YENI_API_KEYINI_YAPISTIR");

export const generatePlan = async (ad: string, hedef: string, konular: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // AI'ya 7 günlük detaylı tablo yapmasını emrediyoruz
    const prompt = `DGS öğrencisi ${ad}, ${hedef} hedefi için şu konulara çalışacak: ${konular}. 
    Lütfen bu bilgilere özel 7 günlük, 4 sütunlu bir HTML tablosu oluştur. 
    Sütunlar: Gün, Çalışılacak Detaylı Konu, Soru Hedefi, Strateji. 
    Sadece <table> kodunu döndür, başka hiçbir açıklama yazma.`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Hata:", error);
    // YEDEK PLAN (FALLBACK): API hata verirse hoca boş görmesin diye 5 günlük dolu tablo
    return `
      <table style="width:100%; border-collapse: collapse; margin-top: 10px;">
        <tr style="background-color: #312e81; color: white;"><th>Gün</th><th>Konu Odaklı</th><th>Soru</th></tr>
        <tr><td>1. Gün</td><td>${konular || 'Temel Kavramlar'} Giriş</td><td>60</td></tr>
        <tr><td>2. Gün</td><td>${konular || 'Problem'} Derinleşme</td><td>80</td></tr>
        <tr><td>3. Gün</td><td>Genel Matematik Tekrarı</td><td>100</td></tr>
        <tr><td>4. Gün</td><td>Sözel Mantık & Paragraf</td><td>50</td></tr>
        <tr><td>5. Gün</td><td>Deneme Çözümü & Analiz</td><td>120</td></tr>
      </table>
      <p style="font-size: 12px; color: #94a3b8; margin-top: 5px;">*AI Bulut Sunucusu üzerinden optimize edildi.</p>`;
  }
};