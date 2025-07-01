
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const HeaderActions = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default HeaderActions;
