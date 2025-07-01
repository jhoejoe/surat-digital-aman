
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CaseStudyBanking = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SuratAman for <span className="text-blue-300">Banking</span>
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                Enhance security, compliance, and customer experience in banking 
                operations with advanced digital signature and identity verification solutions.
              </p>
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3"
                onClick={() => navigate("/contact")}
              >
                Product Inquiry
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-4 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" 
                  alt="Banking Technology" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Strengthen banking operations with secure digital transformation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Enhanced KYC & customer onboarding</h3>
                <p className="text-gray-600">
                  Streamline Know Your Customer (KYC) processes with digital identity verification. 
                  Reduce onboarding time while maintaining the highest security standards and 
                  regulatory compliance requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure loan processing</h3>
                <p className="text-gray-600">
                  Digitize loan applications and approval processes with legally binding digital 
                  signatures. Reduce processing time, eliminate paperwork, and ensure all 
                  documentation meets banking regulations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Comprehensive digital solutions for modern banking
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-indigo-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Digital KYC & identity verification</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-indigo-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Secure loan documentation</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-indigo-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Regulatory compliance tools</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-indigo-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Audit trail & reporting</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-12 text-gray-900">
            Trusted by leading banks across Indonesia
          </h2>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <span className="text-2xl font-bold">BCA</span>
            <span className="text-2xl font-bold">Mandiri</span>
            <span className="text-2xl font-bold">BRI</span>
            <span className="text-2xl font-bold">BNI</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-400 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Transform your banking operations with SuratAman
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-indigo-500 hover:bg-gray-100 px-8 py-3"
              onClick={() => navigate("/contact")}
            >
              Contact sales
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-indigo-500 px-8 py-3"
            >
              See other industries
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyBanking;
