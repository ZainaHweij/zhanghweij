import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Services now links to its own page at /services
  const links = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Pricing", to: "/pricing" },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* LOGO */}
        <Link
          to="/"
          className="text-lg font-medium tracking-tight text-foreground"
        >
          Zhang-Hweij{" "}
          <span className="text-secondary font-semibold">Consulting</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                isActive(link.to) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Button
            asChild
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90 font-medium"
          >
            <Link to="/pricing">Get Started</Link>
          </Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium ${
                isActive(link.to) ? "text-foreground" : "text-muted-foreground"
              } hover:text-foreground`}
            >
              {link.label}
            </Link>
          ))}

          <Button
            asChild
            size="sm"
            className="w-full bg-foreground text-background hover:bg-foreground/90"
          >
            <Link to="/pricing" onClick={() => setOpen(false)}>
              Get Started
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
