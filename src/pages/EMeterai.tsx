
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Shield, 
  ChevronDown,
  Menu,
  X,
  Clock,
  ShieldCheck
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const EMeterai = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const productFeatures = [
    { icon: FileText, title: "e-Meterai", description: "Meterai digital resmi yang diakui pemerintah untuk semua dokumen bisnis" },
    { icon: Shield, title: "Enterprise Plan", description: "Solusi khusus untuk perusahaan besar dengan kebutuhan volume tinggi" },
    { icon: Shield, title: "On Premise", description: "Deploy di server sendiri untuk keamanan dan kontrol maksimal" },
    { icon: FileText, title: "Customer On Board", description: "Onboarding mudah untuk pelanggan dengan verifikasi identitas" },
    { icon: Shield, title: "API Integration", description: "Integrasi mudah dengan sistem existing melalui API" },
    { icon: FileText, title: "Digital Certificate", description: "Sertifikat digital untuk validasi dan keamanan dokumen" }
  ];

  const caseStudies = [
    { title: "Case Study", icon: FileText },
    { title: "Fintech", icon: Shield },
    { title: "Insurance", icon: Shield },
    { title: "Healthcare", icon: FileText },
    { title: "Hospitality", icon: Shield },
    { title: "Oil & Gas", icon: FileText },
    { title: "Education", icon: FileText },
    { title: "Banking", icon: Shield },
    { title: "HR & Outsourcing", icon: FileText }
  ];

  const companyLinks = [
    { title: "About Us", icon: Shield },
    { title: "Career", icon: FileText },
    { title: "Life at SuratAman", icon: Shield },
    { title: "FAQ", icon: FileText }
  ];

  const resourceLinks = [
    { title: "Blog", icon: FileText },
    { title: "User Guide", icon: FileText },
    { title: "Repository Document", icon: FileText },
    { title: "PDF Verification", icon: Shield }
  ];

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const steps = [
    {
      number: "1",
      title: "After uploading document, choose 'Add e-Meterai' and pick the available categories"
    },
    {
      number: "2", 
      title: "Make sure you have read and agreed to SuratAman's Terms of Service and click 'Continue!'"
    },
    {
      number: "3",
      title: "Place e-Meterai on the proper spot in the document, you can add up to 5 e-Meterai in one document"
    },
    {
      number: "4",
      title: "Click 'Proceed' and wait for the e-Meterai attachment process until it's finished"
    },
    {
      number: "5",
      title: "Your document is successfully attached with e-Meterai"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
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

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/business" className="text-gray-500 hover:text-gray-700">Product</Link>
            <span className="text-gray-400">/</span>
            <span className="text-red-500 font-medium">e-Meterai</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-red-500">e-Meterai</span> for Business
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                e-Meterai is the new feature on SuratAman's Web App to attach electronic meterai issued by Peruri 
                on digital documents. Get your e-Meterai at SuratAman's Enterprise account.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-red-500 hover:bg-red-600 text-white px-8"
                >
                  Contact Sales
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  Log in to Enterprise
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <img 
                  src="/lovable-uploads/e88671eb-ccc2-4ef5-8968-7a345d7f2b8c.png" 
                  alt="e-Meterai workspace setup" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Combine Digital Signature and e-Meterai in one SuratAman's platform
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Seamless electronic document signing with an e-Meterai for higher legality. Connect your company's 
              system to purchase e-Meterai through direct top-up or our sales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mobile Phone Mockup */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-2">
                  <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
                    {/* Status Bar */}
                    <div className="h-8 bg-gray-50 flex items-center justify-center">
                      <div className="w-32 h-4 bg-gray-900 rounded-full"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 space-y-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Document Detail</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">Please turn on the notification to get notified when your document is ready for signing</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Turn on notification</span>
                            <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg">
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed">{step.title}</p>
                    {index === 1 && (
                      <div className="mt-2 pl-4 border-l-4 border-red-200">
                        <p className="text-sm text-gray-500 italic">
                          Make sure you have read and agreed to SuratAman's Terms of Service and click 'Continue!'
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Advantages of e-Meterai
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Electronic meterai (e-Meterai) is e-meterai used for electronic documents. The position of electronic meterai with 
              conventional meterai is legally valid and regulated in Law Number 10 of 2020.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Easier and faster to use</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  No more looking for a place to buy e-meterai. You also don't have to worry about the seal that you have torn or lost. Affix the e-meterai to your electronic documents with SuratAman.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Prevent counterfeiting</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  E-meterai has Digital Signature technology and security features. There is also a special Peruri seal that can only be read by a special application. So you don't have to worry about counterfeit or misused electronic meterai.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-400 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Get e-Meterai for business
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              Contact Sales
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-pink-500 px-8"
            >
              Log in to Enterprise
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EMeterai;
