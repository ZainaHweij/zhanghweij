import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingFlat from "@/components/PricingFlat";
import Questions from "@/components/Questions";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-12 bg-background">
        <div className="container mx-auto px-4">
          <PricingFlat />
          <Questions />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
