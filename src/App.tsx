
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import CekKeaslian from "./pages/CekKeaslian";
import KirimSurat from "./pages/KirimSurat";
import CekProgress from "./pages/CekProgress";
import Bantuan from "./pages/Bantuan";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import Demo from "./pages/Demo";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Business from "./pages/Business";
import EMeterai from "./pages/EMeterai";
import EnterprisePlan from "./pages/EnterprisePlan";
import OnPremise from "./pages/OnPremise";
import CustomerOnBoard from "./pages/CustomerOnBoard";
import APIIntegration from "./pages/APIIntegration";
import DigitalCertificate from "./pages/DigitalCertificate";
import CaseStudyFintech from "./pages/CaseStudyFintech";
import CaseStudyInsurance from "./pages/CaseStudyInsurance";
import CaseStudyHealthcare from "./pages/CaseStudyHealthcare";
import CaseStudyHospitality from "./pages/CaseStudyHospitality";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cek-keaslian" element={<CekKeaslian />} />
            <Route path="/kirim-surat" element={<KirimSurat />} />
            <Route path="/cek-progress" element={<CekProgress />} />
            <Route path="/bantuan" element={<Bantuan />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/business" element={<Business />} />
            <Route path="/business/e-meterai" element={<EMeterai />} />
            <Route path="/business/enterprise-plan" element={<EnterprisePlan />} />
            <Route path="/business/on-premise" element={<OnPremise />} />
            <Route path="/business/customer-on-board" element={<CustomerOnBoard />} />
            <Route path="/business/api-integration" element={<APIIntegration />} />
            <Route path="/business/digital-certificate" element={<DigitalCertificate />} />
            <Route path="/business/case-studies/fintech" element={<CaseStudyFintech />} />
            <Route path="/business/case-studies/insurance" element={<CaseStudyInsurance />} />
            <Route path="/business/case-studies/healthcare" element={<CaseStudyHealthcare />} />
            <Route path="/business/case-studies/hospitality" element={<CaseStudyHospitality />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
