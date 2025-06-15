import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ParallaxImageDemo from "@/components/ui/parallax-image-demo";

export default function ParallaxTest() {
  return (
    <div className="min-h-screen">
      <Header />
      <ParallaxImageDemo />
      <Footer />
    </div>
  );
}
