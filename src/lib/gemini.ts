import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("BURAYA_YENI_ALDIĞIN_KEYI_YAPISTIR");

export const generatePlan = async (ad: string, hedef: string, konular: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `DGS öğrencisi ${ad}, ${hedef} hedefi için şu konulara çalışacak: ${konular}. 
    Lütfen bu bilgileri kullanarak 5 günlük, 3 sütunlu bir HTML tablosu oluştur. 
    Sütunlar: Gün, Çalışılacak Konu, Soru Hedefi. Sadece HTML <table> kodunu döndür, açıklama yazma.`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Hata:", error);
    return `<table border="1" style="width:100%; border-collapse: collapse; text-align: left;">
              <tr style="background-color: #334155;"><th>Gün</th><th>Konu</th><th>Hedef</th></tr>
              <tr><td>1. Gün</td><td>${konular} Temel Tekrar</td><td>50 Soru</td></tr>
              <tr><td>2. Gün</td><td>Soru Çözümü</td><td>100 Soru</td></tr>
            </table>
            <p style="margin-top:10px;">⚠️ AI Bağlantısı şu an yedek modda çalışıyor.</p>`;
  }
};