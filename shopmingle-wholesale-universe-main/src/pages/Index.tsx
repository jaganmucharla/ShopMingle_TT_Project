import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import DealsSection from "@/components/DealsSection";
import StatsSection from "@/components/StatsSection";
import WhyShopMingle from "@/components/WhyShopMingle";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <DealsSection />
      <StatsSection />
      <WhyShopMingle />
      <Footer />
    </div>
  );
};

export default Index;
