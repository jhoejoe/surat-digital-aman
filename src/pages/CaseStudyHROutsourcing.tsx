
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CaseStudyHROutsourcing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-900 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SuratAman for <span className="text-cyan-300">HR & Outsourcing</span>
              </h1>
              <p className="text-xl mb-8 text-teal-100">
                Streamline HR processes and outsourcing operations with secure digital 
                contracts, employee onboarding, and document management solutions.
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
                  alt="HR Technology" 
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
            Digitize HR operations and enhance workforce management efficiency
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Digital employee onboarding</h3>
                <p className="text-gray-600">
                  Accelerate new hire processes with digital contracts and identity verification. 
                  Remote employees can complete all necessary documentation securely without 
                  physical presence.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure contract management</h3>
                <p className="text-gray-600">
                  Manage employment contracts, NDAs, and outsourcing agreements with legally 
                  binding digital signatures. Ensure compliance with labor laws and regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Streamlined payroll processing</h3>
                <p className="text-gray-600">
                  Automate payroll documentation and approvals with digital workflows. 
                  Reduce errors and processing time while maintaining accurate records 
                  for audit purposes.
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
            Comprehensive HR & outsourcing solutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-teal-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Digital employee contracts</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-teal-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Identity verification for hiring</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-teal-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Payroll & benefits management</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-teal-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Compliance & audit trails</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-12 text-gray-900">
            Trusted by leading HR and outsourcing companies
          </h2>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <span className="text-2xl font-bold">Adecco</span>
            <span className="text-2xl font-bold">Kelly Services</span>
            <span className="text-2xl font-bold">ManpowerGroup</span>
            <span className="text-2xl font-bold">Randstad</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-400 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Modernize your HR & outsourcing operations with SuratAman
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-teal-500 hover:bg-gray-100 px-8 py-3"
              onClick={() => navigate("/contact")}
            >
              Contact sales
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-teal-500 px-8 py-3"
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

export default CaseStudyHROutsourcing;
