import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tiers = [
  {
    name: "Essentials",
    price: "$1,500",
    description:
      "Perfect for students who need targeted help on key application components.",
    features: [
      "College list strategy (up to 10 schools)",
      "2 personal statement revisions",
      "Activities list review",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Comprehensive",
    price: "$3,500",
    description:
      "Our most popular package — full-cycle support from strategy through submission.",
    features: [
      "College list strategy (up to 15 schools)",
      "Unlimited essay coaching",
      "Activities & honors review",
      "2 mock interviews",
      "Application review & final check",
      "Priority email & chat support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Premium",
    price: "$6,000",
    description:
      "White-glove service for students applying to the most competitive programs.",
    features: [
      "Unlimited school list strategy",
      "Unlimited essay coaching & supplements",
      "Full extracurricular strategy",
      "4 mock interviews with feedback",
      "Complete application management",
      "Dedicated advisor & phone support",
      "Financial aid & scholarship guidance",
    ],
    cta: "Get Started",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">
              Pricing
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Invest in Your Future
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Choose the level of support that matches your goals. Every package
              includes personalized, one-on-one guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-card rounded-xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                  tier.popular
                    ? "border-gold shadow-card-hover scale-[1.02]"
                    : "border-border shadow-elegant"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {tier.name}
                </h3>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    {tier.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <Check className="text-gold mt-0.5 shrink-0" size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full"
                  variant={tier.popular ? "hero" : "default"}
                  size="lg"
                >
                  <Link to="/">
                    {tier.cta} <ArrowRight className="ml-1" size={16} />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ-like note */}
          <div className="text-center mt-16 max-w-lg mx-auto">
            <p className="text-muted-foreground text-sm">
              Not sure which package is right for you?{" "}
              <a
                href="mailto:info@zhanghweij.com"
                className="text-primary font-medium hover:underline"
              >
                Schedule a free consultation
              </a>{" "}
              and we'll help you decide.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
