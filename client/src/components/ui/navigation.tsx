import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

interface NavigationProps {
  currentSection: string;
}

export function Navigation({ currentSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/solutions", label: "Solutions" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/why-choose-us", label: "Why Choose Us" },
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      // Handle anchor links for homepage sections
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (href: string) => {
    if (href.startsWith("#")) {
      return currentSection === href.slice(1);
    }
    return location === href;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-8">
          {navItems.map((item) => (
            item.href.startsWith("#") ? (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActivePage(item.href)
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActivePage(item.href)
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
          <Link
            href="/contact-us"
            className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-gray-900 p-2 h-10 w-10"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 backdrop-blur-lg bg-white/95">
          <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              item.href.startsWith("#") ? (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium transition-colors rounded-lg min-h-[44px] ${
                    isActivePage(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block w-full text-left px-4 py-3 text-base font-medium transition-colors rounded-lg min-h-[44px] ${
                    isActivePage(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <Link
                href="/contact-us"
                className="block w-full text-center bg-primary text-white hover:bg-secondary px-4 py-3 rounded-lg font-medium transition-colors min-h-[44px] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
