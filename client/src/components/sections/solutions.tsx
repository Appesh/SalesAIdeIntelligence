import { TrendingUp, Users, Package, Tag, Search, Heart, Check } from "lucide-react";
import type { Solution } from "@/lib/types";

export function Solutions() {
  const solutions: Solution[] = [
    {
      id: "sales-forecasting",
      title: "**Never Miss Revenue Opportunities**",
      description: "Motivio predicts your sales with 95% accuracy, automatically identifying the best times to launch campaigns and optimize inventory.",
      icon: "TrendingUp",
      iconColor: "bg-primary",
      features: ["Automated predictions", "Seasonal optimization", "Multi-channel insights"]
    },
    {
      id: "customer-segmentation",
      title: "**Target High-Value Customers Automatically**",
      description: "Our AI identifies your most profitable customers and creates personalized campaigns that increase conversion rates by 40%.",
      icon: "Users",
      iconColor: "bg-accent",
      features: ["Behavioral targeting", "Purchase pattern analysis", "Automated personalization"]
    },
    {
      id: "inventory-optimization",
      title: "**Reduce Waste, Maximize Profits**",
      description: "Eliminate overstock and stockouts with AI-driven demand planning that adapts to market changes in real-time.",
      icon: "Package",
      iconColor: "bg-success",
      features: ["Smart demand forecasting", "Automated reordering", "Waste elimination"]
    },
    {
      id: "dynamic-pricing",
      title: "**Price Optimization on Autopilot**",
      description: "Maximize revenue with dynamic pricing that automatically adjusts based on demand, competition, and market conditions.",
      icon: "Tag",
      iconColor: "bg-purple-500",
      features: ["Real-time price optimization", "Competitor monitoring", "Profit maximization"]
    }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      TrendingUp,
      Users,
      Package,
      Tag,
      Search,
      Heart
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="text-white text-xl" size={24} /> : null;
  };

  return (
    <section id="solutions" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Key Benefits: Why Retail Leaders Choose <span className="gradient-wegic bg-clip-text text-transparent gradient-text-force">SalesAIde</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Our automated retail solutions deliver measurable results across every aspect of your business. No manual work required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 card-hover shadow-lg"
            >
              <div className={`w-18 h-18 ${solution.iconColor} rounded-2xl flex items-center justify-center mb-6 animate-float icon-btn-enhanced`}>
                {getIcon(solution.icon)}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {solution.title.replace(/\*\*/g, '')}
              </h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {solution.description}
              </p>
              <ul className="space-y-3 text-gray-700">
                {solution.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-wegic-green mr-3" size={20} />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
