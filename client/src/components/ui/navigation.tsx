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
              item.href.startsWith("#") ? (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
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
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                    isActivePage(item.href)
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
            <Link
              href="/contact-us"
              className="w-full bg-primary text-white hover:bg-secondary px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
