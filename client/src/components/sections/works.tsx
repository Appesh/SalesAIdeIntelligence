import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParallaxImage from "@/components/ui/parallax-image";

interface WorkExample {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageUrl: string;
  imageAlt: string;
  bgColor: string;
  textColor: string;
  stats: {
    metric: string;
    value: string;
  }[];
}

const works: WorkExample[] = [
  {
    title: "FASHION FORWARD",
    subtitle: "Seasonal Sales Optimization",
    description: "AI-powered seasonal campaigns that increased holiday sales by 65% for a premium fashion retailer",
    image: "🛍️",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Fashion retail store with modern displays",
    bgColor: "bg-gradient-to-br from-wegic-purple to-wegic-pink",
    textColor: "text-white",
    stats: [
      { metric: "Sales Increase", value: "65%" },
      { metric: "Customer Retention", value: "89%" }
    ]
  },
  {
    title: "TECH REVOLUTION",
    subtitle: "Inventory Intelligence Platform",
    description: "Smart inventory management that reduced waste by 40% while boosting electronics sales",
    image: "📱",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
    imageAlt: "Modern electronics and technology devices",
    bgColor: "bg-gradient-to-br from-wegic-blue to-wegic-green",
    textColor: "text-white",
    stats: [
      { metric: "Waste Reduction", value: "40%" },
      { metric: "Profit Margin", value: "+28%" }
    ]
  },
  {
    title: "HOME & GARDEN",
    subtitle: "Customer Segmentation AI",
    description: "Personalized marketing campaigns that transformed a local garden center into a regional leader",
    image: "🌱",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Beautiful garden center with plants and flowers",
    bgColor: "bg-gradient-to-br from-wegic-green to-wegic-yellow",
    textColor: "text-white",
    stats: [
      { metric: "Revenue Growth", value: "120%" },
      { metric: "New Customers", value: "300%" }
    ]
  }
];

export function Works() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Works
          </h2>
          <h3 className="text-2xl font-bold text-gray-700 mb-8">
            Where sales magic happens
          </h3>
        </div>

        <div className="space-y-12">
          {works.map((work, index) => (
            <div
              key={index}
              className={`${work.bgColor} rounded-3xl p-8 md:p-12 ${work.textColor} relative overflow-hidden card-hover`}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 text-8xl opacity-20 font-black">
                {work.image}
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                <div>
                  <div className="text-sm font-bold opacity-80 mb-2 tracking-wider">
                    {work.title}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-black mb-4">
                    {work.subtitle}
                  </h4>
                  <p className="text-lg opacity-90 mb-6 leading-relaxed">
                    {work.description}
                  </p>
                  
                  <div className="flex space-x-6 mb-6">
                    {work.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-2xl font-black">{stat.value}</div>
                        <div className="text-sm opacity-80">{stat.metric}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="btn-outline-white"
                    size="default"
                  >
                    View Case Study
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-center">
                  <ParallaxImage
                    src={work.imageUrl}
                    alt={work.imageAlt}
                    effect="combined"
                    containerClassName="w-80 h-64 rounded-xl shadow-2xl"
                    minScale={0.9}
                    maxScale={1.1}
                    minRotation={-2}
                    maxRotation={2}
                    minOpacity={0.8}
                    maxOpacity={1}
                    minTranslateY={15}
                    maxTranslateY={-15}
                    scrollSensitivity={0.5}
                    transitionDuration={0.4}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
            <div className="text-4xl font-black text-wegic-purple mb-2">230</div>
            <div className="text-gray-600 font-medium">Countries and regions covered</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
            <div className="text-4xl font-black text-wegic-pink mb-2">500,000+</div>
            <div className="text-gray-600 font-medium">Sales optimized</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
            <div className="text-4xl font-black text-wegic-green mb-2">80%</div>
            <div className="text-gray-600 font-medium">Starting from zero</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
            <div className="text-4xl font-black text-wegic-yellow mb-2">95%</div>
            <div className="text-gray-600 font-medium">Success rate</div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Bring your sales ideas to life with your AI team
          </h3>
          <Button size="lg" className="btn-special-glow">
            Chat for Free!
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
