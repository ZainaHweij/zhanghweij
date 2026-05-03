import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, FileText, Users, Target, Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroCampus from "@/assets/hero-campus.jpg";

const services = [
  {
    icon: Target,
    title: "College List Strategy",
    description: "Curated school lists based on your profile, goals, and fit — reach, match, and safety schools strategically selected.",
  },
  {
    icon: FileText,
    title: "Essay Coaching",
    description: "Brainstorming, structuring, and refining your personal statements and supplements until they shine.",
  },
  {
    icon: Users,
    title: "Interview Prep",
    description: "Mock interviews and tailored feedback to help you present your best self with confidence.",
  },
  {
    icon: GraduationCap,
    title: "Full Application Review",
    description: "End-to-end review of your entire application — activities, honors, recommendations, and more.",
  },
];

const testimonials = [
  {
    quote: "Zhang-Hweij Consulting helped me get into my dream school. The essay coaching was transformative.",
    name: "Sarah L.",
    school: "Stanford '28",
  },
  {
    quote: "Their strategic approach to my college list gave me confidence and clarity throughout the process.",
    name: "James K.",
    school: "MIT '29",
  },
  {
    quote: "I couldn't have navigated the admissions process without their incredible support and expertise.",
    name: "Priya M.",
    school: "Columbia '28",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroCampus}
            alt="Prestigious university campus"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-hero opacity-80" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="max-w-2xl">
            <p className="text-gold font-medium text-sm uppercase tracking-widest mb-4 animate-fade-in">
              Expert College Admissions Consulting
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Your Path to the <span className="text-gradient-gold">Right College</span> Starts Here
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Personalized guidance from former admissions insiders to help ambitious students stand out and get accepted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="lg" className="text-base">
                <Link to="/pricing">
                  View Packages <ArrowRight className="ml-1" size={18} />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg" className="text-base">
                <a href="#services">Our Services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "95%", label: "Acceptance Rate" },
              { value: "500+", label: "Students Guided" },
              { value: "50+", label: "Top-30 Admits" },
              { value: "10+", label: "Years Experience" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold font-serif text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Comprehensive Admissions Support</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-card rounded-lg p-6 shadow-elegant hover:shadow-card-hover transition-all duration-300 border border-border hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <s.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-gold font-medium text-sm uppercase tracking-widest mb-2">Success Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Hear From Our Students</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-lg p-6 shadow-elegant border border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="text-gold fill-gold" size={16} />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Book a free consultation and discover how we can help you reach your dream school.
          </p>
          <Button asChild variant="hero" size="lg" className="text-base">
            <Link to="/pricing">
              See Our Packages <ArrowRight className="ml-1" size={18} />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
