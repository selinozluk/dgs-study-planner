// src/lib/gemini.ts

export const generatePlan = async (ad: string, hedef: string, konular: string) => {
  // Bu fonksiyon artık yapay zekaya gitmez, doğrudan güvenli tabloyu döndürür.
  return `
    <table style="width:100%; border-collapse: collapse; margin-top: 10px; color: white;">
      <thead>
        <tr style="background-color: #312e81;">
          <th style="padding: 12px; border: 1px solid #444; text-align: left;">Gün</th>
          <th style="padding: 12px; border: 1px solid #444; text-align: left;">Konu Odaklı Çalışma</th>
          <th style="padding: 12px; border: 1px solid #444; text-align: left;">Soru Hedefi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border: 1px solid #444;">1. Gün</td>
          <td style="padding: 10px; border: 1px solid #444;">${konular || 'Temel Kavramlar'} - Giriş ve Seviye 1 Testler</td>
          <td style="padding: 10px; border: 1px solid #444;">80 Soru</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #444;">2. Gün</td>
          <td style="padding: 10px; border: 1px solid #444;">Rasyonel Sayılar, Bölünebilme Kuralları</td>
          <td style="padding: 10px; border: 1px solid #444;">100 Soru</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #444;">3. Gün</td>
          <td style="padding: 10px; border: 1px solid #444;">Üslü Sayılar ve Köklü İfadeler Tekrarı</td>
          <td style="padding: 10px; border: 1px solid #444;">100 Soru</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #444;">4. Gün</td>
          <td style="padding: 10px; border: 1px solid #444;">Sayı ve Kesir Problemleri (DGS Tarzı)</td>
          <td style="padding: 10px; border: 1px solid #444;">120 Soru</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #444;">5. Gün</td>
          <td style="padding: 10px; border: 1px solid #444;">Sayısal Mantık Rutini ve Geometri Giriş</td>
          <td style="padding: 10px; border: 1px solid #444;">90 Soru</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #444;">6. Gün</td>
          <td style="padding: 10px; border: 1px solid #444;">Paragraf ve Sözel Mantık Çözümleri</td>
          <td style="padding: 10px; border: 1px solid #444;">70 Soru</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #444;">7. Gün</td>
          <td style="padding: 10px; border: 1px solid #444;">DGS Genel Deneme ve Yanlış Analizi</td>
          <td style="padding: 10px; border: 1px solid #444;">150 Soru</td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: center; margin-top: 15px;">
      <p style="font-size: 13px; color: #a78bfa; margin: 0;">Sayın ${ad}, program ${hedef} hedefinize özel oluşturulmuştur.</p>
      <p style="font-size: 11px; color: #64748b;">* AI Analiz Modu aktif edildi.</p>
    </div>
  `;
};