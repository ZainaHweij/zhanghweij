import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingFlat from "@/components/PricingFlat";
import Questions from "@/components/Questions";

const Checkout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <PricingFlat />
          <Questions />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
