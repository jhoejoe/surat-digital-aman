
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, FileText, Users, Settings, Filter, Upload, Search, MoreHorizontal } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDocuments } from "@/hooks/useDocuments";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PersonalAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedFilter, setSelectedFilter] = useState("semua");
  const { user, profile } = useAuth();
  const { data: documents = [] } = useDocuments();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">Proses</Badge>;
      case "DRAFT":
        return <Badge className="bg-gray-100 text-gray-800">Draf</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    if (selectedFilter === "semua") return true;
    return doc.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Halo, {profile?.full_name || user?.email}
            </h1>
            <p className="text-gray-600 mt-1">Kelola dokumen dan aktivitas Anda</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload dokumen
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-4">
            {/* Account Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Akun Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    activeTab === "dashboard" 
                      ? "bg-blue-50 text-blue-700 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Perlu tindakan
                </button>
                <button
                  onClick={() => setActiveTab("inbox")}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    activeTab === "inbox" 
                      ? "bg-blue-50 text-blue-700 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Kotak masuk
                </button>
                <button
                  onClick={() => setActiveTab("sent")}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    activeTab === "sent" 
                      ? "bg-blue-50 text-blue-700 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Terkirim
                </button>
                <button
                  onClick={() => setActiveTab("drafts")}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    activeTab === "drafts" 
                      ? "bg-blue-50 text-blue-700 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Draf
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    activeTab === "completed" 
                      ? "bg-blue-50 text-blue-700 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Selesai
                </button>
                <button
                  onClick={() => setActiveTab("archive")}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    activeTab === "archive" 
                      ? "bg-blue-50 text-blue-700 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Arsip
                </button>
              </CardContent>
            </Card>

            {/* Personal Plan Info */}
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Personal plan</h4>
                <p className="text-blue-600 font-medium mb-1">Aktif</p>
                <p className="text-sm text-gray-500">Berlaku hingga 18 Jul 2025</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              {/* Controls Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Cari judul..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                      />
                    </div>
                    <select 
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="semua">Semua aksi</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Selesai</option>
                      <option value="draft">Draf</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>30 hari terakhir</option>
                      <option>7 hari terakhir</option>
                      <option>Bulan ini</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  
                  {activeTab === "dashboard" && (
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center">
                      <Bell className="w-4 h-4 mr-2" />
                      <span className="text-sm">Notifikasi: Tunjukkan notifikasi belum dibaca</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                {activeTab === "dashboard" && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Hebat! Semua dokumen telah diselesaikan
                    </h3>
                    <p className="text-gray-500">
                      Dokumen yang memerlukan tindakan akan ditampilkan di sini
                    </p>
                  </div>
                )}

                {activeTab !== "dashboard" && (
                  <div className="space-y-4">
                    {/* Document Table Header */}
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 border-b pb-3">
                      <div className="col-span-6">Nama dokumen</div>
                      <div className="col-span-2">Penerima</div>
                      <div className="col-span-2">Diunggah pada</div>
                      <div className="col-span-2">Status</div>
                    </div>

                    {/* Document Rows */}
                    {filteredDocuments.map((doc) => (
                      <div key={doc.id} className="grid grid-cols-12 gap-4 py-4 border-b hover:bg-gray-50 transition-colors">
                        <div className="col-span-6 flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 font-medium">{doc.file_name}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">{doc.recipient}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <span className="text-gray-600">
                            {new Date(doc.created_at).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <div className="col-span-2 flex items-center justify-between">
                          {getStatusBadge(doc.status)}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {filteredDocuments.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Tidak ada dokumen ditemukan</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Pagination */}
                {filteredDocuments.length > 0 && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t">
                    <p className="text-sm text-gray-600">
                      Halaman 1 dari 1
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Tampilkan baris</span>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                          <option>15</option>
                          <option>25</option>
                          <option>50</option>
                        </select>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Pertama</Button>
                        <Button variant="outline" size="sm">Terakhir</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Process Queue Sidebar */}
          {activeTab === "dashboard" && (
            <div className="w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Proses latar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-3">e-Meterai</h4>
                      <div className="space-y-2">
                        {[
                          "pernyataan_hak_cipta_cek_lisensi",
                          "pernyataan_hak_cipta_sikahana", 
                          "pernyataan_hak_cipta_USULANPBJ",
                          "pernyataan_hak_cipta",
                          "SURAT KUASA KHUSUS Sdr. JOHANI FAUZI"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded-md p-3 shadow-sm">
                            <span className="text-sm text-gray-700 truncate mr-2">{item}</span>
                            <Badge className="bg-green-100 text-green-800 text-xs shrink-0">Selesai</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PersonalAdminDashboard;
