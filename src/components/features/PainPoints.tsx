
import { AlertTriangle } from "lucide-react";

const PainPoints = () => {
  const painPoints = [
    "⏰ Stress setiap kali ada kontrak mendadak - print, scan, tunggu, kirim email berulang kali",
    "😰 Begadang mikirin dokumen penting yang hilang atau bisa dipalsukan kompetitor", 
    "💸 Biaya print, scan, dan kirim dokumen yang bengkak - belum lagi ongkos bensin bolak-balik",
    "🚗 Kehilangan deal jutaan rupiah karena terlambat tanda tangan - klien kabur ke kompetitor"
  ];

  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-4 animate-pulse">
        <AlertTriangle className="w-4 h-4 mr-2" />
        Masih Pakai Cara Jadul? Kompetitor Anda Ketawa!
      </div>
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
        Berhenti Siksa Diri dengan Cara Kuno!
        <br />
        <span className="text-red-600">Print-Scan-Kirim Era Sudah Berlalu</span>
      </h2>
      
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto mb-12 border-l-4 border-red-500">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
          Sudah Berapa Lama Anda Tersiksa Seperti Ini?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((problem, index) => (
            <div key={index} className="text-left p-4 bg-red-50 rounded-lg border border-red-200">
              <span className="text-gray-700 font-medium">{problem}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r-lg">
          <p className="text-gray-700 font-bold text-lg">
            💡 <strong>FAKTA MENGEJUTKAN:</strong> Rata-rata perusahaan membuang 
            <span className="text-red-600"> 15-20 jam per bulan</span> dan 
            <span className="text-red-600"> Rp 500.000+</span> hanya untuk urusan print-scan-kirim dokumen!
          </p>
          <p className="text-gray-600 mt-2">
            Belum lagi deal yang hilang karena terlambat... Kerugiannya bisa jutaan rupiah!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PainPoints;
