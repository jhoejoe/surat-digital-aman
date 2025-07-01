
import PainPoints from "./features/PainPoints";
import Solutions from "./features/Solutions";
import Testimonials from "./features/Testimonials";
import FinalCTA from "./features/FinalCTA";

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PainPoints />
        <Solutions />
        <Testimonials />
        <FinalCTA />
      </div>
    </section>
  );
};

export default Features;
