
import { resourceLinks } from "./navigationData";

interface ResourceDropdownProps {
  isActive: boolean;
  onClose: () => void;
}

const ResourceDropdown = ({ isActive, onClose }: ResourceDropdownProps) => {
  if (!isActive) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50 p-4">
      <div className="grid grid-cols-1 gap-2">
        {resourceLinks.map((resource, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={onClose}
          >
            <resource.icon className="h-4 w-4 text-red-500" />
            <span className="text-gray-700">{resource.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceDropdown;
