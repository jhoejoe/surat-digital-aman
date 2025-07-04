
import { useNavigate } from "react-router-dom";
import { caseStudies } from "./navigationData";

interface CaseStudiesDropdownProps {
  isActive: boolean;
  onClose: () => void;
}

const CaseStudiesDropdown = ({ isActive, onClose }: CaseStudiesDropdownProps) => {
  const navigate = useNavigate();

  if (!isActive) return null;

  const handleCaseStudyClick = (caseStudy: typeof caseStudies[0]) => {
    if (caseStudy.link) {
      navigate(caseStudy.link);
      onClose();
    }
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50 p-4">
      <div className="grid grid-cols-1 gap-2">
        {caseStudies.map((study, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => handleCaseStudyClick(study)}
          >
            <study.icon className="h-4 w-4 text-red-500" />
            <span className="text-gray-700">{study.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesDropdown;
