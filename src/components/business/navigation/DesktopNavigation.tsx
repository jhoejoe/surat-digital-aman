
import { ChevronDown } from "lucide-react";
import ProductDropdown from "./ProductDropdown";
import CaseStudiesDropdown from "./CaseStudiesDropdown";
import CompanyDropdown from "./CompanyDropdown";
import ResourceDropdown from "./ResourceDropdown";

interface DesktopNavigationProps {
  activeDropdown: string | null;
  toggleDropdown: (dropdown: string) => void;
  closeDropdowns: () => void;
}

const DesktopNavigation = ({ 
  activeDropdown, 
  toggleDropdown, 
  closeDropdowns 
}: DesktopNavigationProps) => {
  return (
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
  );
};

export default DesktopNavigation;
