
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CaseStudyFintech = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SuratAman for <span className="text-red-300">Fintech</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                Enabling financial inclusion for everyone through digital signature and digital 
                identity technology.
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
                  src="/lovable-uploads/53046bc1-0457-4a8b-8649-58e646077174.png" 
                  alt="Fintech Professional" 
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
            Sustaining fintech consistently with more secure transactions and legally binding digital signatures
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Onboarding process anywhere, at anytime</h3>
                <p className="text-gray-600">
                  With digital identity and digital signature, SuratAman provides end-to-end digital 
                  process of onboarding your signing documents from commercial customers 
                  and longer need to have to be served offline to process.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Save more time and cost</h3>
                <p className="text-gray-600">
                  With SuratAman, long and complicated administrative processes can be completed 
                  electronically. Reduce the cost of wage and storing large amounts of paper 
                  with SuratAman's digital solutions.
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
            See how our solutions can help digital transformation for fintech
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-blue-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Digital certificate issuance for account opening</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-blue-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">ID document verification</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-blue-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Legally-binding digital signature</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-blue-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Custom platform builder</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-400 to-pink-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Get started with SuratAman's solution for fintech
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-red-500 hover:bg-gray-100 px-8 py-3"
              onClick={() => navigate("/contact")}
            >
              Contact sales
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-500 px-8 py-3"
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

export default CaseStudyFintech;
