
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CaseStudyOilGas = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SuratAman for <span className="text-orange-300">Oil & Gas</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Streamline operations and ensure compliance in the oil & gas industry 
                through secure digital documentation and signatures.
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
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&h=400&fit=crop" 
                  alt="Oil & Gas Operations" 
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
            Enhance operational efficiency and regulatory compliance in oil & gas operations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Streamlined contract management</h3>
                <p className="text-gray-600">
                  Manage complex contracts, joint ventures, and partnerships with legally binding 
                  digital signatures. Reduce processing time and ensure all parties can sign 
                  documents securely from anywhere in the world.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Regulatory compliance made easy</h3>
                <p className="text-gray-600">
                  Ensure all documentation meets industry standards and regulatory requirements. 
                  Digital audit trails and tamper-proof documents help maintain compliance 
                  with environmental and safety regulations.
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
            Digital solutions for oil & gas industry challenges
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-blue-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Contract digitization & signing</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-blue-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Compliance documentation</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-blue-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Secure document storage</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-400 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Transform your oil & gas operations with SuratAman
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-3"
              onClick={() => navigate("/contact")}
            >
              Contact sales
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-500 px-8 py-3"
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

export default CaseStudyOilGas;
