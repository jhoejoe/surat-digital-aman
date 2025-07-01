
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Server, 
  Lock, 
  Database,
  CheckCircle,
  ChevronRight,
  Building,
  Users,
  FileText
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";

const OnPremise = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Complete Privacy Control",
      description: "Deploy SuratAman Business on your own servers for maximum data privacy and security control. Your sensitive documents never leave your infrastructure.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      icon: Server,
      title: "Dedicated Infrastructure",
      description: "Get your own dedicated digital signature infrastructure with guaranteed performance and availability tailored to your business needs.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      icon: Database,
      title: "Custom Integration",
      description: "Seamlessly integrate with your existing systems and databases. Our on-premise solution adapts to your current workflow and business processes.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      icon: Lock,
      title: "Advanced Security Features",
      description: "Benefit from enterprise-grade security with HSM integration, advanced encryption, and compliance with Indonesian regulations and international standards.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Maximum Security & Compliance",
      description: "Meet the strictest security requirements with on-premise deployment. Ensure compliance with industry regulations and data sovereignty requirements."
    },
    {
      icon: Server,
      title: "Full Control & Customization",
      description: "Complete control over your digital signature environment. Customize workflows, integrations, and user experiences to match your exact requirements."
    },
    {
      icon: Database,
      title: "Scalable Performance",
      description: "Scale your digital signature infrastructure according to your business growth. Handle high-volume document processing with guaranteed performance."
    }
  ];

  const certifications = [
    "ISO 27001", "ISO 9001", "WebTrust", "KOMINFO", "BSSN", "PSrE"
  ];

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/business" className="hover:text-red-500">Business</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">On Premise</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                SuratAman Business: On-Premise <span className="text-red-400">Digital Signature</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                Integrate SuratAman Business for the next level and safely regulated 
                authentication system into your own working environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-red-500 hover:bg-red-600 text-white px-8"
                  onClick={() => navigate("/demo")}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md ml-auto">
                <img 
                  src="/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png" 
                  alt="On-Premise Solution" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Signature Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Digital Signature for your privacy control & additional security
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            SuratAman Business lets you choose how the flexibility control comes to digital signature solution deployment.
          </p>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Digital document management
              </h3>
              <p className="text-gray-600">
                Eliminate manual management with a guaranteed security and connectedness from SuratAman Business's DNS System.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Implement SuratAman Business in your system
            </h2>
            <p className="text-xl text-gray-600">
              Incorporate SuratAman Business's solution into your working environment and keep full control of your administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* When to Use Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            When Is The Right Time to Use SuratAman Business's On-Premise Solution?
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Know your business needs for a private administration approach. Get our solution, if you need:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Managing hundreds & thousands of documents every month
              </h3>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Having your own IT infrastructure and Security Operation Center
              </h3>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Requiring extensive features as well as the ability to modify them
              </h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why choose SuratAman Business?
            </h2>
            <p className="text-xl text-gray-600">
              Here are the reasons why we are ahead of others in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-200 to-pink-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Register Now and embrace the new experience of signing & digital document management
              </h2>
              <Button 
                size="lg" 
                className="bg-red-500 hover:bg-red-600 text-white px-8"
                onClick={() => navigate("/contact")}
              >
                Product Inquiry
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Certification and Acknowledgment
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OnPremise;
