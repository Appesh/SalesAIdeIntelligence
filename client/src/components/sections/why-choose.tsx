import { Rocket, Shield, Settings, Headphones, Star } from "lucide-react";
import type { Feature, Stats } from "@/lib/types";

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
    <section id="why-choose" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose SalesAIde?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of retail businesses that have transformed their sales performance with our AI-powered platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                  {getIcon(feature.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:order-last">
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                  <div className="text-primary text-2xl">"</div>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-blue-100">CEO, Fashion Forward Retail</p>
                </div>
              </div>
              <blockquote className="text-lg leading-relaxed mb-6">
                "SalesAIde transformed our business completely. We went from struggling during slow seasons to consistently hitting our targets. The AI insights are incredibly accurate and actionable."
              </blockquote>
              <div className="flex items-center">
                <div className="flex text-yellow-300 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={16} />
                  ))}
                </div>
                <span className="text-blue-100">5.0 stars</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
