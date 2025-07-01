
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminAnalytics from "@/components/AdminAnalytics";
import AdminDocuments from "@/components/AdminDocuments";
import AdminUsers from "@/components/AdminUsers";
import AdminCertificates from "@/components/AdminCertificates";
import AdminDemoRequests from "@/components/AdminDemoRequests";
import ApiIntegrations from "@/components/ApiIntegrations";
import AuditTrail from "@/components/AuditTrail";
import TeamManagement from "@/components/TeamManagement";
import AdminBlog from "@/components/AdminBlog";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return <AdminAnalytics />;
      case "documents":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Manajemen Dokumen</h2>
              <AdminDocuments />
            </div>
          </div>
        );
      case "users":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Manajemen Pengguna</h2>
              <AdminUsers />
            </div>
          </div>
        );
      case "teams":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Manajemen Tim</h2>
              <TeamManagement />
            </div>
          </div>
        );
      case "certificates":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Manajemen Sertifikat</h2>
              <AdminCertificates />
            </div>
          </div>
        );
      case "demo":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Permintaan Demo</h2>
              <AdminDemoRequests />
            </div>
          </div>
        );
      case "blog":
        return <AdminBlog />;
      case "integrations":
        return <ApiIntegrations />;
      case "audit":
        return <AuditTrail />;
      default:
        return <AdminAnalytics />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-2">Kelola sistem dan monitor aktivitas</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 h-auto bg-transparent p-1">
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 border-b-2 border-transparent hover:border-gray-300 transition-colors py-3 px-4 text-sm font-medium"
              >
                Analisa
              </TabsTrigger>
              <TabsTrigger 
                value="documents"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 border-b-2 border-transparent hover:border-gray-300 transition-colors py-3 px-4 text-sm font-medium"
              >
                Dokumen
              </TabsTrigger>
              <TabsTrigger 
                value="users"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 border-b-2 border-transparent hover:border-gray-300 transition-colors py-3 px-4 text-sm font-medium"
              >
                Pengguna
              </TabsTrigger>
              <TabsTrigger 
                value="teams"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 border-b-2 border-transparent hover:border-gray-300 transition-colors py-3 px-4 text-sm font-medium"
              >
                Tim
              </TabsTrigger>
              <TabsTrigger 
                value="certificates"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 border-b-2 border-transparent hover:border-gray-300 transition-colors py-3 px-4 text-sm font-medium"
              >
                Sertifikat
              </TabsTrigger>
              <TabsTrigger 
                value="demo"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 border-b-2 border-transparent hover:border-gray-300 transition-colors py-3 px-4 text-sm font-medium"
              >
                Demo
              </TabsTrigger>
              <TabsTrigger 
                value="blog"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 border-b-2 border-transparent hover:border-gray-300 transition-colors py-3 px-4 text-sm font-medium"
              >
                Blog
              </TabsTrigger>
              <TabsTrigger 
                value="integrations"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 border-b-2 border-transparent hover:border-gray-300 transition-colors py-3 px-4 text-sm font-medium"
              >
                API Integration
              </TabsTrigger>
              <TabsTrigger 
                value="audit"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 border-b-2 border-transparent hover:border-gray-300 transition-colors py-3 px-4 text-sm font-medium"
              >
                Audit Trail
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-6">
            {renderContent()}
          </div>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
