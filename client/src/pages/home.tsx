import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Overview } from "@/components/sections/overview";
import { Works } from "@/components/sections/works";
import { FeaturesWegic } from "@/components/sections/features-wegic";
import { Solutions } from "@/components/sections/solutions";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyChoose } from "@/components/sections/why-choose";
import { Contact } from "@/components/sections/contact";
import { AIAvatars, FloatingAvatars } from "@/components/ui/ai-avatars";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AIAvatars />
        <Works />
        <FeaturesWegic />
        <Overview />
        <Solutions />
        <HowItWorks />
        <WhyChoose />
        <Contact />
      </main>
      <Footer />
      <FloatingAvatars />
    </div>
  );
}
