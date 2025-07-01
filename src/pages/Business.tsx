
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  Users, 
  Building, 
  Zap, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const Business = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const productFeatures = [
    {
      icon: FileText,
      title: "e-Meterai",
      description: "Meterai digital resmi yang diakui pemerintah untuk semua dokumen bisnis"
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

  const benefits = [
    {
      title: "Hemat Waktu & Biaya",
      description: "Proses tanda tangan digital 10x lebih cepat dari metode konvensional",
      icon: Zap
    },
    {
      title: "Keamanan Terjamin",
      description: "Sertifikat digital dan enkripsi tingkat militer untuk proteksi maksimal",
      icon: Shield
    },
    {
      title: "Compliance & Legal",
      description: "Sesuai dengan regulasi pemerintah dan standar internasional",
      icon: CheckCircle
    },
    {
      title: "Skalabilitas Bisnis",
      description: "Solusi yang dapat berkembang seiring pertumbuhan perusahaan",
      icon: Building
    }
  ];

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
                        <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-900 mb-6">
                Indonesia's #1 Digital Identity and Digital Signature
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                SuratAman for <span className="text-red-400">Business</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                From customer onboarding to signing contracts, streamline every 
                business needs with our digital solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-red-500 hover:bg-red-600 text-white px-8"
                  onClick={() => navigate("/demo")}
                >
                  Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md ml-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-500 text-sm">Document Signing</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-500">CEO, Company</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Jane Smith</p>
                      <p className="text-sm text-gray-500">Legal Director</p>
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full ml-auto"></div>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Contract Agreement</span>
                    <span className="text-sm text-gray-500">2/3 signed</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-8">Trusted by 2000+ companies with 500M verified users</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {/* Placeholder for company logos */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-12 bg-gray-300 rounded flex items-center justify-center">
                <Building className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Accelerate your business with SuratAman end-to-end digital solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Welcome to SuratAman for business. Our fast and leading digital signature and digital identity provider in Indonesia. 
              Enjoy a convenient & efficient digital experience with advanced trust & security through our business solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Plan</h2>
            <p className="text-xl text-gray-600">Solusi lengkap untuk kebutuhan bisnis enterprise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-red-500" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to streamline your business processes?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Join thousands of companies already using SuratAman for their digital signature needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8"
              onClick={() => navigate("/demo")}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-600 px-8"
              onClick={() => navigate("/contact")}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Business;
