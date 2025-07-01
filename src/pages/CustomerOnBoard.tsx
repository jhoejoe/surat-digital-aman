
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  UserCheck, 
  Shield, 
  Smartphone,
  CheckCircle,
  ChevronRight,
  Clock,
  Globe,
  FileText
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";

const CustomerOnBoard = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Smartphone,
      title: "Instant registration",
      description: "Transform time-consuming form filling and online verification into a QR code scan or login with SuratAman Business",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      icon: Shield,
      title: "Manage data in one dashboard",
      description: "Automatically verify customer data with a real-time dashboard for members",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      icon: UserCheck,
      title: "User-centric digital identity",
      description: "Higher level of security with 2-factor authentication and data sharing history",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Time & cost efficient",
      description: "Reduce onboarding time from hours to minutes with automated verification processes."
    },
    {
      icon: Shield,
      title: "Ensured with security",
      description: "Maximum customers trust and retention by ensuring security to their personal information. Equipped with liveness detection and two-factor authentication."
    },
    {
      icon: Users,
      title: "Seamless customer experience",
      description: "Provide smooth and user-friendly onboarding process that increases customer satisfaction and completion rates."
    }
  ];

  const whyChooseFeatures = [
    {
      icon: Shield,
      title: "The leading digital signature & digital identity provider",
      description: "SuratAman Business is the market leader in Digital Trust with 60 million verified users and over 3500 enterprise customers."
    },
    {
      icon: CheckCircle,
      title: "Ensure legality",
      description: "SuratAman Business has received WebTrust for Certification Authority (CA) accreditation to strengthen the proof of SuratAman Business's digital signature and the data security of all users."
    },
    {
      icon: Users,
      title: "Safeguards from threats",
      description: "SuratAman Business has earned ISO/IEC 27001:2013 Information Security Management System certification to keep the confidentiality and security of your data."
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
            <span className="text-gray-900">Customer On Board</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                SuratAman Business - One ID For All Onboarding <span className="text-red-500">Experiences</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Frictionless online and offline registration process with SuratAman Business's 
                digital identity. No more username and passwords, no more 
                physical documents, just one app away.
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
                  alt="Customer Onboarding" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to the new era of universally-accepted digital identity
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Improve user experience with SuratAman Business's digital identity to access website & applications from various services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Onboard Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Onboard anywhere with one pass
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Unveil a smooth user experience through automatic registration process, no more hassles of bringing physical documents, no more wasted time fulfilling redundant registration forms, just use SuratAman Business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-left hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-50">
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
            {whyChooseFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
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
      <section className="py-20 bg-gradient-to-r from-pink-200 to-pink-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get a faster onboarding process
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

export default CustomerOnBoard;
