
import { TrendingUp, Globe } from "lucide-react";

const Testimonials = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl mb-16 border-t-4 border-green-500">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Mereka Sudah Merasakan Keajaiban Ini
        </h3>
        <p className="text-gray-600 text-lg">
          Dari stress jadi santai, dari rugi jadi untung besar!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border-l-4 border-blue-500 shadow-lg">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-bold text-sm">OMZET NAIK 40%</span>
          </div>
          <p className="text-gray-700 italic font-medium text-lg mb-4 leading-relaxed">
            "Dulu saya stress banget kalau ada kontrak mendadak. Tim panik, printer macet, 
            scanner error... Sekarang? Dalam 5 menit kelar semua! Klien sampai heran 
            kok bisa secepat ini. <strong>Omzet naik 40% karena deal lebih cepat closing!</strong> 
            ROI-nya gila-gilaan!"
          </p>
          <div className="flex items-center">
            <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-700 font-bold text-lg">AS</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Andi Setiawan</p>
              <p className="text-sm text-gray-600">CEO PT Teknologi Maju</p>
              <p className="text-xs text-blue-600 font-semibold">Hemat 20 jam/bulan • Omzet +40%</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border-l-4 border-green-500 shadow-lg">
          <div className="flex items-center mb-4">
            <Globe className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-green-600 font-bold text-sm">BISNIS GLOBAL</span>
          </div>
          <p className="text-gray-700 italic font-medium text-lg mb-4 leading-relaxed">
            "Klien saya di Singapura dan Malaysia bisa langsung tanda tangan kontrak 
            tanpa delay. Dulu harus kirim dokumen via kurir, tunggu 3-5 hari. 
            <strong>Sekarang bisnis jadi international, cash flow lancar jaya!</strong> 
            Kompetitor masih pake cara lama, mereka ketinggalan jauh!"
          </p>
          <div className="flex items-center">
            <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-700 font-bold text-lg">SM</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Sari Melati</p>
              <p className="text-sm text-gray-600">Direktur CV Sukses Mandiri</p>
              <p className="text-xs text-green-600 font-semibold">Ekspansi 3 negara • Revenue +65%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
