import { Rocket, Shield, Settings, Headphones, Star } from "lucide-react";
import type { Feature, Stats } from "@/lib/types";
import ParallaxImage from "@/components/ui/parallax-image";

export function WhyChoose() {
  const features: Feature[] = [
    {
      icon: "Rocket",
      title: "Proven Results",
      description: "Our clients see an average 40% increase in sales within the first 6 months. Our AI learns from your specific business patterns to deliver personalized strategies.",
      color: "bg-primary"
    },
    {
      icon: "Shield",
      title: "Enterprise Security",
      description: "Bank-level encryption and SOC 2 compliance ensure your sensitive business data remains secure and protected at all times.",
      color: "bg-accent"
    },
    {
      icon: "Settings",
      title: "Easy Integration",
      description: "Connect with 100+ popular retail platforms in minutes. No complex setup or technical expertise required.",
      color: "bg-success"
    },
    {
      icon: "Headphones",
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to help you maximize your AI investment and achieve your sales goals.",
      color: "bg-purple-500"
    }
  ];

  const stats: Stats[] = [
    { value: "500+", label: "Happy Clients" },
    { value: "40%", label: "Average Sales Increase" },
    { value: "95%", label: "Prediction Accuracy" },
    { value: "99%", label: "Customer Satisfaction" }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      Rocket,
      Shield,
      Settings,
      Headphones
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="text-white" size={24} /> : null;
  };

  return (
    <section id="why-choose" className="py-20 relative overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Technology and innovation background"
          effect="combined"
          containerClassName="h-full"
          className="opacity-20"
          minScale={1}
          maxScale={1.08}
          minOpacity={0.15}
          maxOpacity={0.25}
          minTranslateY={0}
          maxTranslateY={-40}
          scrollSensitivity={0.4}
          transitionDuration={0.5}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-purple-900/90 to-pink-900/90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Why Choose <span className="gradient-wegic bg-clip-text text-transparent gradient-text-force">Motivio</span>?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Join hundreds of retail businesses that have transformed their sales performance with our AI-powered platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start bg-white/10 backdrop-blur-lg rounded-2xl p-6 card-hover border border-white/20">
                <div className={`w-18 h-18 ${feature.color} rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 animate-float icon-btn-enhanced`}>
                  {getIcon(feature.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:order-last">
            <div className="gradient-wegic rounded-3xl p-8 text-white shadow-2xl card-hover">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                  <div className="text-wegic-purple text-3xl font-bold">"</div>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sarah Johnson</h4>
                  <p className="text-white/80">CEO, Fashion Forward Retail</p>
                </div>
              </div>
              <blockquote className="text-xl leading-relaxed mb-6 font-medium">
                "Motivio transformed our business completely. We went from struggling during slow seasons to consistently hitting our targets. The AI insights are incredibly accurate and actionable."
              </blockquote>
              <div className="flex items-center">
                <div className="flex text-wegic-yellow mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={20} />
                  ))}
                </div>
                <span className="text-white/90 font-semibold">5.0 stars</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="card-hover">
                <div className="text-4xl font-black text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-gray-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
