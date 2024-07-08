import BestSellingSection from "@/components/shared/HomePage/BestSellingSection";
import CategoriesCTA from "@/components/shared/HomePage/CategoriesCTA";
import FeaturesSection from "@/components/shared/HomePage/FeaturesSection";
import HeroSection from "@/components/shared/HomePage/HeroSection";
import NewsletterSection from "@/components/shared/HomePage/NewsletterSection";
import ProductsListSection from "@/components/shared/HomePage/ProductsListSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <BestSellingSection />
      <CategoriesCTA />
      <ProductsListSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
