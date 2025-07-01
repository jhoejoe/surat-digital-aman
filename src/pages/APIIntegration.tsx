
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code, 
  Workflow, 
  Webhook, 
  Shield, 
  Users,
  CheckCircle,
  ChevronRight,
  FileText,
  Settings,
  Zap
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";

const APIIntegration = () => {
  const navigate = useNavigate();

  const apiFeatures = [
    {
      icon: Users,
      title: "User Registration API",
      description: "Ensure the highest level of user registration by verifying every user's identity through SuratAman Business's electronic certificate and verification system."
    },
    {
      icon: FileText,
      title: "Document Upload API",
      description: "Seamlessly upload and manage documents with our secure API endpoints."
    },
    {
      icon: Shield,
      title: "Signature Setup API",
      description: "Configure digital signatures with enterprise-grade security."
    },
    {
      icon: Settings,
      title: "Signing API",
      description: "Complete document signing process through our comprehensive API."
    }
  ];

  const whyChooseFeatures = [
    {
      icon: Workflow,
      title: "Workflow",
      description: "Achieve user workflows in your applications at a build speed that decreases time to market."
    },
    {
      icon: Webhook,
      title: "Webhooks",
      description: "Subscribe to events' document activities & system as a desired workflow integration."
    },
    {
      icon: Shield,
      title: "OAuth2",
      description: "Use your user in external documents we manage without throughout a third-party platform."
    },
    {
      icon: Users,
      title: "User Management",
      description: "Automatically calls, stores, and update your users' right through the age of SDK."
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "The leading digital signature & digital identity provider",
      description: "SuratAman Business is the market leader in Digital Trust with 60 million verified users and over 3500 enterprise customers."
    },
    {
      icon: CheckCircle,
      title: "Ensure legality",
      description: "SuratAman Business has received WebTrust for Certification Authority (CA) accreditation to strengthen the proof of digital signatures."
    },
    {
      icon: Users,
      title: "Safeguards from threats",
      description: "SuratAman Business has earned ISO/IEC 27001:2013 Information Security Management System certification."
    }
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
            <span className="text-gray-900">API Integration</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                SuratAman Business's <span className="text-red-500">Seamless API Suite Integration</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get the right experience with our easy-to-use API Documentation. Use code 
                examples, real-world sample scripts in your own application.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-red-500 hover:bg-red-600 text-white px-8"
                  onClick={() => navigate("/demo")}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50 px-8"
                >
                  Product Inquiry
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-6">
                <img 
                  src="/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png" 
                  alt="API Integration" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get SuratAman Business Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get SuratAman Business to elevate your business
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Whether it's digital sign integration or a full digital workflow, you can rely on SuratAman Business for a thorough approach.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {apiFeatures.map((feature, index) => (
              <Card key={index} className="text-left hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Here's why you should consider using SuratAman Business's API Suite
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            From easy work process to seamless user management, SuratAman Business can accommodate your requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((feature, index) => (
              <Card key={index} className="text-left hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SuratAman Business */}
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
                Embrace the new digital signing & document management experience
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

      <Footer />
    </div>
  );
};

export default APIIntegration;
