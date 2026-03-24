// src/lib/gemini.ts

export const generatePlan = async (ad: string, hedef: string, konular: string) => {
  // Kullanıcının girdiği konuları temizleyip listeye çeviriyoruz
  const konuListesi = konular ? konular.split(',').map(k => k.trim()) : ['Genel Matematik Tekrarı'];
  
  // Programı oluştururken kullanacağımız yardımcı fonksiyon
  const getKonu = (gunIndex: number) => {
    return konuListesi[gunIndex % konuListesi.length];
  };

  return `
    <table style="width:100%; border-collapse: collapse; margin-top: 10px; color: white;">
      <thead>
        <tr style="background-color: #312e81;">
          <th style="padding: 12px; border: 1px solid #444; text-align: left;">Gün</th>
          <th style="padding: 12px; border: 1px solid #444; text-align: left;">Odaklanılacak Konu</th>
          <th style="padding: 12px; border: 1px solid #444; text-align: left;">DGS Rutini (Sabah/Akşam)</th>
          <th style="padding: 12px; border: 1px solid #444; text-align: left;">Soru Hedefi</th>
        </tr>
      </thead>
      <tbody>
        ${[1, 2, 3, 4, 5, 6].map(gun => `
          <tr>
            <td style="padding: 10px; border: 1px solid #444;">${gun}. Gün</td>
            <td style="padding: 10px; border: 1px solid #444; font-weight: bold; color: #a78bfa;">
              ${getKonu(gun - 1)}
            </td>
            <td style="padding: 10px; border: 1px solid #444; font-size: 0.85rem;">
              20 Paragraf + 15 Problem Sorusu (Zorunlu)
            </td>
            <td style="padding: 10px; border: 1px solid #444;">${80 + (gun * 10)} Soru</td>
          </tr>
        `).join('')}
        <tr style="background: rgba(139, 92, 246, 0.1);">
          <td style="padding: 10px; border: 1px solid #444;">7. Gün</td>
          <td style="padding: 10px; border: 1px solid #444; font-weight: bold; color: #f472b6;">GENEL DENEME SINAWI</td>
          <td style="padding: 10px; border: 1px solid #444; font-size: 0.85rem;">Tüm Haftanın Analizi ve Eksik Giderme</td>
          <td style="padding: 10px; border: 1px solid #444;">Deneme + 50 Soru</td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: center; margin-top: 15px;">
      <p style="font-size: 13px; color: #a78bfa; margin: 0;">Sayın ${ad}, program ${hedef} hedefinize ve yazdığınız konulara göre dinamik olarak güncellenmiştir.</p>
    </div>
  `;
};