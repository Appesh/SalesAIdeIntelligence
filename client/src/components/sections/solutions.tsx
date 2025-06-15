import { TrendingUp, Users, Package, Tag, Search, Heart, Check } from "lucide-react";
import type { Solution } from "@/lib/types";

export function Solutions() {
  const solutions: Solution[] = [
    {
      id: "sales-forecasting",
      title: "**Never Miss Revenue Opportunities**",
      description: "SalesAIde predicts your sales with 95% accuracy, automatically identifying the best times to launch campaigns and optimize inventory.",
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
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Key Benefits: Why Retail Leaders Choose SalesAIde
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our automated retail solutions deliver measurable results across every aspect of your business. No manual work required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${solution.iconColor} rounded-lg flex items-center justify-center mb-4`}>
                {getIcon(solution.icon)}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {solution.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {solution.description}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {solution.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-success mr-2" size={16} />
                    <span>{feature}</span>
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
