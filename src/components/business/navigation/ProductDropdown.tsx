
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productFeatures } from "./navigationData";

interface ProductDropdownProps {
  isActive: boolean;
  onClose: () => void;
}

const ProductDropdown = ({ isActive, onClose }: ProductDropdownProps) => {
  const navigate = useNavigate();

  if (!isActive) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 p-4">
      <div className="grid grid-cols-1 gap-3">
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
            <feature.icon className="h-5 w-5 text-red-500" />
            <div>
              <p className="font-medium text-gray-900">{feature.title}</p>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-red-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-900">Punya kebutuhan khusus?</p>
            <Button variant="link" className="p-0 h-auto text-red-600 hover:text-red-700">
              Pelajari lebih lanjut →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDropdown;
