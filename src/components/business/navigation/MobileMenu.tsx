
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { productFeatures, caseStudies, companyLinks, resourceLinks } from "./navigationData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="p-4 space-y-6">
        {/* Product Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
          <div className="space-y-2">
            {productFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => {
                  if (feature.link) {
                    navigate(feature.link);
                    onClose();
                  }
                }}
              >
                <feature.icon className="h-4 w-4 text-red-500" />
                <span className="text-gray-700">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies Section */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Case Studies</h3>
          <div className="space-y-2">
            {caseStudies.slice(0, 5).map((study, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <study.icon className="h-4 w-4 text-red-500" />
                <span className="text-gray-700">{study.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Company & Resources */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <div className="space-y-2">
              {companyLinks.map((link, index) => (
                <div key={index} className="text-gray-700 text-sm">{link.title}</div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resource</h3>
            <div className="space-y-2">
              {resourceLinks.map((resource, index) => (
                <div key={index} className="text-gray-700 text-sm">{resource.title}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-500 transition-colors">
              Personal
            </Link>
            <span className="text-red-500 font-medium">Business</span>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
