
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { caseStudies } from "@/components/business/navigation/navigationData";

const CaseStudies = () => {
  const navigate = useNavigate();

  const handleCaseStudyClick = (caseStudy: typeof caseStudies[0]) => {
    if (caseStudy.link) {
      navigate(caseStudy.link);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Industry <span className="text-red-300">Case Studies</span>
          </h1>
          <p className="text-xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Discover how SuratAman Business solutions are transforming industries across Indonesia 
            through digital signatures, identity verification, and secure document management.
          </p>
          <Button 
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3"
            onClick={() => navigate("/contact")}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Explore Solutions by Industry
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.slice(1).map((study, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleCaseStudyClick(study)}
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                    <study.icon className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-red-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn how SuratAman's digital solutions are transforming {study.title.toLowerCase()} operations through secure, efficient, and compliant processes.
                  </p>
                  <div className="flex items-center text-red-500 group-hover:text-red-600 transition-colors">
                    <span className="text-sm font-medium">Read Case Study</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-400 to-pink-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to transform your industry?
          </h2>
          <p className="text-xl text-white mb-8">
            Join leading companies across Indonesia who trust SuratAman for their digital transformation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-red-500 hover:bg-gray-100 px-8 py-3"
              onClick={() => navigate("/contact")}
            >
              Contact Sales
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-500 px-8 py-3"
              onClick={() => navigate("/demo")}
            >
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
