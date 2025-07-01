
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProductDropdown from "./navigation/ProductDropdown";
import CaseStudiesDropdown from "./navigation/CaseStudiesDropdown";
import CompanyDropdown from "./navigation/CompanyDropdown";
import ResourceDropdown from "./navigation/ResourceDropdown";
import MobileMenu from "./navigation/MobileMenu";

const BusinessHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">
              SuratAman <span className="text-red-500">Business</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Product Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('product')}
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                Product <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <ProductDropdown 
                isActive={activeDropdown === 'product'} 
                onClose={closeDropdowns}
              />
            </div>

            {/* Case Studies Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('cases')}
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                Case Studies <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <CaseStudiesDropdown 
                isActive={activeDropdown === 'cases'} 
                onClose={closeDropdowns}
              />
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('company')}
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                Company <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <CompanyDropdown 
                isActive={activeDropdown === 'company'} 
                onClose={closeDropdowns}
              />
            </div>

            {/* Resource Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resource')}
                className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                Resource <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <ResourceDropdown 
                isActive={activeDropdown === 'resource'} 
                onClose={closeDropdowns}
              />
            </div>
          </nav>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-500 transition-colors">
              Personal
            </Link>
            <span className="text-red-500 font-medium">Business</span>
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">
              Contact Sales
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </header>
  );
};

export default BusinessHeader;
