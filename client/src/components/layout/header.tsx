import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";

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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">
                SalesAI<span className="text-primary">de</span>
              </h1>
            </div>
          </div>
          <Navigation currentSection={currentSection} />
        </div>
      </nav>
    </header>
  );
}
