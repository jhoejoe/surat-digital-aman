
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  UserCheck, 
  CheckCircle, 
  Smartphone,
  ChevronRight,
  Users,
  FileText,
  Lock,
  Globe
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";

const DigitalCertificate = () => {
  const navigate = useNavigate();

  const verificationSteps = [
    {
      number: "1",
      title: "Seamless onboarding",
      description: "Seamless onboarding process with real digital experience"
    },
    {
      number: "2", 
      title: "Secure verification",
      description: "Secure verification of biometric data"
    },
    {
      number: "3",
      title: "Accurate results",
      description: "Accurate results to prevent online fraud and crime"
    }
  ];

  const features = [
    {
      title: "Document ID Verification",
      description: "Complete verification process with advanced security measures"
    },
    {
      title: "Facial recognition with liveness detection", 
      description: "Advanced biometric verification for maximum security"
    },
    {
      title: "Electronic certificate issuance",
      description: "Complete verification of customer identity and biometric data connected to the relevant institution by issuing of Level 3 Electronic Certificates by SuratAman Business. Registered Electronic Certificate Provider (PSrE) is verified by the Ministry of Communication and Information."
    }
  ];

  const solutions = [
    {
      icon: Shield,
      title: "Reliable & trusted digital certificate issuance provider",
      description: "SuratAman Business is the first and most trusted Electronic Certificate Provider (PSrE) which certifies your organization as an Electronic Certificate Provider. Ensuring all digital certificates issuance securely supervised by ESE."
    },
    {
      icon: Globe,
      title: "Integrated with other qualified features",
      description: "Optimize the certified digital signature, electronic certificate, and evidence of trust application."
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
            <span className="text-gray-900">Digital Certificate Issuance</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Trusted <span className="text-red-500">Digital Certificate</span> Issuance Provider in Indonesia
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                User identity verification made easier with SuratAman Business's Digital certificate 
                issuance system
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
              <div className="bg-white rounded-lg shadow-2xl p-6">
                <img 
                  src="/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png" 
                  alt="Digital Certificate Issuance" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Identity Verification Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            User identity verification with SuratAman Business
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Identity verification is needed in onboarding process for new bank account opening, 
            loan agreement, or credit card application. Ensure your data customers' security and 
            prevent fraud with SuratAman Business's digital certificate issuance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {verificationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frictionless Onboarding Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frictionless onboarding with the highest security
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Build products flexibility and increase security with SuratAman Business's advanced 
            identity verification. From ID cards to biometric, integrated with digital identity, 
            verified digital signatures, and electronic certificate.
          </p>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Solution Section */}
      <section className="py-20 bg-gradient-to-r from-pink-200 to-pink-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Practical and legal solution for your need
          </h2>
          <p className="text-xl text-gray-700 mb-16">
            Integrate SuratAman Business's digital certificate issuance solution into your working 
            environment
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="p-8 text-left bg-white">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <solution.icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-200 to-pink-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get on board with SuratAman Business digital certificate issuance now
              </h2>
              <Button 
                size="lg" 
                className="bg-red-500 hover:bg-red-600 text-white px-8"
                onClick={() => navigate("/contact")}
              >
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalCertificate;
