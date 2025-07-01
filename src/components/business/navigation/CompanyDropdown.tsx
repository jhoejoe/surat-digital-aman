
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { companyLinks } from "./navigationData";

interface CompanyDropdownProps {
  isActive: boolean;
  onToggle: () => void;
}

export const CompanyDropdown = ({ isActive, onToggle }: CompanyDropdownProps) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
      >
        Company <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isActive && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50 p-4">
          <div className="grid grid-cols-1 gap-2">
            {companyLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <link.icon className="h-4 w-4 text-red-500" />
                <span className="text-gray-700">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
