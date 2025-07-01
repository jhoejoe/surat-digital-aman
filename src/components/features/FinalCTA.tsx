
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4 mr-2" />
            PENAWARAN TERBATAS - BERAKHIR SEGERA!
          </div>
          <h3 className="text-4xl font-bold mb-6">
            Jangan Sampai Menyesal Selamanya!
          </h3>
          <p className="text-blue-100 mb-4 max-w-3xl mx-auto text-xl leading-relaxed">
            Setiap hari yang Anda tunda, kompetitor semakin jauh unggul. 
            Sementara Anda masih repot print-scan, mereka sudah closing deal jutaan rupiah.
          </p>
          <p className="text-yellow-200 mb-8 max-w-2xl mx-auto text-lg font-semibold">
            <strong>Mau sampai kapan Anda tersiksa seperti ini?</strong> 
            Bergabunglah dengan 50,000+ pebisnis cerdas yang sudah merasakan keajaiban ini!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={() => navigate("/kirim-surat")}
              className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
            >
              🚀 YA! Saya Mau Hemat 15 Jam Bulan Ini!
            </Button>
            <Button 
              onClick={() => navigate("/demo")}
              variant="outline"
              className="border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all shadow-2xl"
            >
              📹 Tunjukkan Buktinya (Demo 2 Menit)
            </Button>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-2xl mx-auto">
            <p className="text-sm text-yellow-200 font-semibold mb-2">
              🎁 BONUS EKSKLUSIF HARI INI:
            </p>
            <ul className="text-sm text-white space-y-1">
              <li>✅ Gratis 30 hari trial (tanpa kartu kredit)</li>
              <li>✅ Setup gratis oleh expert kami</li>
              <li>✅ Training 1-on-1 untuk tim Anda</li>
              <li>✅ Support WhatsApp priority 24/7</li>
            </ul>
          </div>
          <p className="text-xs text-blue-100">
            *Garansi 100% uang kembali jika tidak puas dalam 30 hari | Sudah dipercaya 50,000+ pengguna
          </p>
        </div>
        
        {/* Enhanced decorative elements */}
        <div className="absolute top-6 right-6 text-6xl opacity-20 animate-bounce">💰</div>
        <div className="absolute bottom-6 left-6 text-6xl opacity-20 animate-pulse">⚡</div>
        <div className="absolute top-1/2 left-6 text-4xl opacity-20">🚀</div>
        <div className="absolute top-1/3 right-6 text-4xl opacity-20">📈</div>
      </div>
    </div>
  );
};

export default FinalCTA;
