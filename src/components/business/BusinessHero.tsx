
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusinessHero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-blue-100 text-blue-900 mb-6">
              Indonesia's #1 Digital Identity and Digital Signature
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              SuratAman for <span className="text-red-400">Business</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              From customer onboarding to signing contracts, streamline every 
              business needs with our digital solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-red-500 hover:bg-red-600 text-white px-8"
                onClick={() => navigate("/demo")}
              >
                Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                Contact Sales
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md ml-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-500 text-sm">Document Signing</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">CEO, Company</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Jane Smith</p>
                    <p className="text-sm text-gray-500">Legal Director</p>
                  </div>
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full ml-auto"></div>
                </div>
              </div>
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Contract Agreement</span>
                  <span className="text-sm text-gray-500">2/3 signed</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHero;
