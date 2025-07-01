
import { Building } from "lucide-react";

const TrustedBySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 mb-8">Trusted by 2000+ companies with 500M verified users</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
          {/* Placeholder for company logos */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-300 rounded flex items-center justify-center">
              <Building className="w-8 h-8 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
