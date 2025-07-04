import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Header() {
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSectionId = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          currentSectionId = section.getAttribute("id") || "home";
        }
      });

      setCurrentSection(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                Moti<span className="gradient-wegic-text">vi</span><span className="text-wegic-purple">o</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-8">
            <Navigation currentSection={currentSection} />
            <Button
              onClick={scrollToContact}
              size="sm"
              className="hidden sm:inline-flex sm:size-default"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Build Your Growth</span>
              <span className="md:hidden">Get Started</span>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
