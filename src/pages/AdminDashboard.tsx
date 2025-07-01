
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminAnalytics from "@/components/AdminAnalytics";
import AdminDocuments from "@/components/AdminDocuments";
import AdminUsers from "@/components/AdminUsers";
import AdminCertificates from "@/components/AdminCertificates";
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
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="analytics">Analisa</TabsTrigger>
            <TabsTrigger value="documents">Dokumen</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
            <TabsTrigger value="teams">Tim</TabsTrigger>
            <TabsTrigger value="certificates">Sertifikat</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="integrations">API Integration</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

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
