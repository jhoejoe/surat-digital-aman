
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Building, 
  Shield, 
  Users, 
  Zap, 
  Globe,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BusinessHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const productFeatures = [
    {
      icon: FileText,
      title: "e-Meterai",
      description: "Meterai digital resmi yang diakui pemerintah untuk semua dokumen bisnis",
      link: "/business/e-meterai"
    },
    {
      icon: Building,
      title: "Enterprise Plan",
      description: "Solusi khusus untuk perusahaan besar dengan kebutuhan volume tinggi"
    },
    {
      icon: Shield,
      title: "On Premise",
      description: "Deploy di server sendiri untuk keamanan dan kontrol maksimal"
    },
    {
      icon: Users,
      title: "Customer On Board",
      description: "Onboarding mudah untuk pelanggan dengan verifikasi identitas"
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

  const caseStudies = [
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

  const companyLinks = [
    { title: "About Us", icon: Building },
    { title: "Career", icon: Users },
    { title: "Life at Privy", icon: Globe },
    { title: "FAQ", icon: FileText }
  ];

  const resourceLinks = [
    { title: "Blog", icon: FileText },
    { title: "User Guide", icon: Users },
    { title: "Repository Document", icon: FileText },
    { title: "PDF Verification", icon: Shield }
  ];

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">
              SuratAman <span className="text-red-500">Business</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Product Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('product')}
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                Product <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'product' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 p-4">
                  <div className="grid grid-cols-1 gap-3">
                    {productFeatures.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => feature.link && navigate(feature.link)}
                      >
                        <feature.icon className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-gray-900">{feature.title}</p>
                          <p className="text-sm text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-900">Punya kebutuhan khusus?</p>
                        <Button variant="link" className="p-0 h-auto text-red-600 hover:text-red-700">
                          Pelajari lebih lanjut →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Case Studies Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('cases')}
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                Case Studies <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'cases' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {caseStudies.map((study, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <study.icon className="h-4 w-4 text-red-500" />
                        <span className="text-gray-700">{study.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('company')}
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                Company <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'company' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {companyLinks.map((link, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <link.icon className="h-4 w-4 text-red-500" />
                        <span className="text-gray-700">{link.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resource Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resource')}
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                Resource <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'resource' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {resourceLinks.map((resource, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <resource.icon className="h-4 w-4 text-red-500" />
                        <span className="text-gray-700">{resource.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-500 transition-colors">
              Personal
            </Link>
            <span className="text-red-500 font-medium">Business</span>
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">
              Contact Sales
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default BusinessHeader;
