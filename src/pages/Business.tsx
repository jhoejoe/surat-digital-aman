
import BusinessHeader from "@/components/business/BusinessHeader";
import BusinessHero from "@/components/business/BusinessHero";
import TrustedBySection from "@/components/business/TrustedBySection";
import BenefitsSection from "@/components/business/BenefitsSection";
import ProductFeaturesSection from "@/components/business/ProductFeaturesSection";
import BusinessCTA from "@/components/business/BusinessCTA";
import Footer from "@/components/Footer";

const Business = () => {
  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      <BusinessHero />
      <TrustedBySection />
      <BenefitsSection />
      <ProductFeaturesSection />
      <BusinessCTA />
      <Footer />
    </div>
  );
};

export default Business;
