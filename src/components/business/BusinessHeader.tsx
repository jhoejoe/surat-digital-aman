
import { useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import DesktopNavigation from "./navigation/DesktopNavigation";
import HeaderActions from "./navigation/HeaderActions";
import MobileMenu from "./navigation/MobileMenu";

const BusinessHeader = () => {
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
          <DesktopNavigation 
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            closeDropdowns={closeDropdowns}
          />

          {/* Right Side Navigation */}
          <HeaderActions />

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
