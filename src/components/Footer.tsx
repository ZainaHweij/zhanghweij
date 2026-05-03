import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4">

      <div className="grid md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-lg font-medium tracking-tight mb-3">
            Zhang-Hweij{" "}
            <span className="text-secondary-foreground font-semibold">
              Consulting
            </span>
          </h3>

          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Guiding ambitious students toward their dream colleges with expert, personalized admissions consulting.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-primary-foreground/50 mb-4">
            Quick Links
          </h4>

          <div className="space-y-2">
            <Link
              to="/"
              className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>

            <Link
              to="/pricing"
              className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Pricing
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-primary-foreground/50 mb-4">
            Contact
          </h4>

          <p className="text-sm text-primary-foreground/70">
            info@zhanghweij.com
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} Zhang-Hweij Consulting. All rights reserved.
      </div>

    </div>
  </footer>
);

export default Footer;