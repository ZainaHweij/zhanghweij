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

const Index = () => {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroGround}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto gap-20">
            <div className="max-w-2xl text-white">
              <p className="text-sm uppercase tracking-widest mb-4 opacity-80 font-medium">
                Modern, relevant college counseling
              </p>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
                Stand out in a crowded applicant pool.
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 font-medium"
                >
                  <Link to="/pricing">
                    Schedule a Free Call{" "}
                    <ArrowRight className="ml-1" size={18} />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="lg">
                  <a href="#services">Our Services</a>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <FlippingCards />
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section>
        <div className="container mx-auto px-4">
          <AboutMe />
          <PricingComponent />
          <Registration />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
