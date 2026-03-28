import HeroSection from "./hero.component";
import ComingSoonSection from "./coming-soon.component";

const OnlinePujaPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Coming Soon Content */}
      <ComingSoonSection />
    </div>
  );
};

export default OnlinePujaPage;
