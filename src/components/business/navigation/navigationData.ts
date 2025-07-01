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
    description: "Integrasi mudah dengan sistem existing melalui API",
    link: "/business/api-integration"
  },
  {
    icon: Globe,
    title: "Digital Certificate",
    description: "Sertifikat digital untuk validasi dan keamanan dokumen",
    link: "/business/digital-certificate"
  }
];

export const caseStudies = [
  { title: "Case Study", icon: FileText, link: "/business/case-studies" },
  { title: "Fintech", icon: Building, link: "/business/case-studies/fintech" },
  { title: "Insurance", icon: Shield, link: "/business/case-studies/insurance" },
  { title: "Healthcare", icon: Users, link: "/business/case-studies/healthcare" },
  { title: "Hospitality", icon: Globe, link: "/business/case-studies/hospitality" },
  { title: "Oil & Gas", icon: Zap, link: "/business/case-studies/oil-gas" },
  { title: "Education", icon: FileText, link: "/business/case-studies/education" },
  { title: "Banking", icon: Building, link: "/business/case-studies/banking" },
  { title: "HR & Outsourcing", icon: Users, link: "/business/case-studies/hr-outsourcing" }
];

export const companyLinks = [
  { title: "About Us", icon: Shield, href: "/business/about-us" },
  { title: "Career", icon: FileText, href: "/business/career" },
  { title: "Life at SuratAman", icon: Shield, href: "/business/life-at-surataman" },
  { title: "FAQ", icon: FileText, href: "/business/faq" }
];

export const resourceLinks = [
  { title: "Blog", icon: FileText },
  { title: "User Guide", icon: Users },
  { title: "Repository Document", icon: FileText },
  { title: "PDF Verification", icon: Shield }
];
