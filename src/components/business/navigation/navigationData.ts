
import { 
  FileText, 
  Building, 
  Shield, 
  Users, 
  Zap, 
  Globe
} from "lucide-react";

export const productFeatures = [
  {
    icon: FileText,
    title: "e-Meterai",
    description: "Meterai digital resmi yang diakui pemerintah untuk semua dokumen bisnis",
    link: "/business/e-meterai"
  },
  {
    icon: Building,
    title: "Enterprise Plan",
    description: "Solusi khusus untuk perusahaan besar dengan kebutuhan volume tinggi",
    link: "/business/enterprise-plan"
  },
  {
    icon: Shield,
    title: "On Premise",
    description: "Deploy di server sendiri untuk keamanan dan kontrol maksimal",
    link: "/business/on-premise"
  },
  {
    icon: Users,
    title: "Customer On Board",
    description: "Onboarding mudah untuk pelanggan dengan verifikasi identitas",
    link: "/business/customer-on-board"
  },
  {
    icon: Zap,
    title: "API Integration",
    description: "Integrasi mudah dengan sistem existing melalui API"
  },
  {
    icon: Globe,
    title: "Digital Certificate",
    description: "Sertifikat digital untuk validasi dan keamanan dokumen"
  }
];

export const caseStudies = [
  { title: "Case Study", icon: FileText },
  { title: "Fintech", icon: Building },
  { title: "Insurance", icon: Shield },
  { title: "Healthcare", icon: Users },
  { title: "Hospitality", icon: Globe },
  { title: "Oil & Gas", icon: Zap },
  { title: "Education", icon: FileText },
  { title: "Banking", icon: Building },
  { title: "HR & Outsourcing", icon: Users }
];

export const companyLinks = [
  { title: "About Us", icon: Building },
  { title: "Career", icon: Users },
  { title: "Life at Privy", icon: Globe },
  { title: "FAQ", icon: FileText }
];

export const resourceLinks = [
  { title: "Blog", icon: FileText },
  { title: "User Guide", icon: Users },
  { title: "Repository Document", icon: FileText },
  { title: "PDF Verification", icon: Shield }
];
