import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  currentSection: string;
}

export function Navigation({ currentSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#solutions", label: "Solutions" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#why-choose", label: "Why Choose Us" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentSection === item.href.slice(1)
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection("#contact")}
            className="bg-primary text-white hover:bg-secondary"
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-gray-900"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t z-50">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                  currentSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="w-full bg-primary text-white hover:bg-secondary"
            >
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
