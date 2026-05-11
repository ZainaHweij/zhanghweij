import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroGround from "@/assets/heroground.png";
import FlippingCards from "@/components/FlippingCards";
import Registration from "@/components/Registration";
import AboutMe from "@/components/AboutMe";
import PricingComponent from "@/components/PricingComponent";
import Help from "@/components/Help";

const Index = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background — no overlay */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroGround}
            alt="background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Desktop cards — absolute positioned */}
        <div className="hidden lg:block">
          <FlippingCards />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-0 lg:gap-20">
            {/* Text */}
            <div className="max-w-xl text-white text-center lg:text-left">
              <p className="text-xs sm:text-sm uppercase tracking-widest mb-4 opacity-80 font-medium">
                Modern, relevant college counseling
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Stand out in a crowded applicant pool.
              </h1>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 font-medium w-full sm:w-auto"
                >
                  <Link to="/checkout">
                    Schedule a Free Call{" "}
                    <ArrowRight className="ml-1" size={18} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="heroOutline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <a href="#services">Our Services</a>
                </Button>
              </div>
            </div>

            {/* Mobile/tablet cards — inline below text */}
            <div className="lg:hidden w-full">
              <FlippingCards />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* <Help />*/}
        <AboutMe />
        <PricingComponent />
        <Registration />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
