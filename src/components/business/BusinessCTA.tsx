
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BusinessCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to streamline your business processes?
        </h2>
        <p className="text-xl mb-8 text-red-100">
          Join thousands of companies already using SuratAman for their digital signature needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-red-600 hover:bg-gray-100 px-8"
            onClick={() => navigate("/demo")}
          >
            Start Free Trial
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-red-600 px-8"
            onClick={() => navigate("/contact")}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BusinessCTA;
