
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CaseStudyEducation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SuratAman for <span className="text-yellow-300">Education</span>
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Modernize educational institutions with digital document management, 
                secure student records, and streamlined administrative processes.
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
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop" 
                  alt="Educational Technology" 
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
            Digitize education administration and enhance student experience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Paperless student enrollment</h3>
                <p className="text-gray-600">
                  Streamline the enrollment process with digital forms and signatures. 
                  Parents and students can complete registration from home, reducing 
                  administrative burden and improving efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure academic records</h3>
                <p className="text-gray-600">
                  Protect student data and academic records with digital certificates 
                  and secure storage. Ensure only authorized personnel can access 
                  sensitive educational information.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Digital certificate issuance</h3>
                <p className="text-gray-600">
                  Issue tamper-proof digital diplomas and certificates that can be 
                  verified instantly by employers and other institutions, eliminating 
                  document fraud.
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
            Comprehensive solutions for educational institutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-green-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Digital enrollment & registration</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-green-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Secure academic records management</h3>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-green-200 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900">Digital diploma & certificate verification</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Modernize your educational institution with SuratAman
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-green-500 hover:bg-gray-100 px-8 py-3"
              onClick={() => navigate("/contact")}
            >
              Contact sales
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-500 px-8 py-3"
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

export default CaseStudyEducation;
