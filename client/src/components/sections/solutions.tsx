import { TrendingUp, Users, Package, Tag, Search, Heart, Check } from "lucide-react";
import type { Solution } from "@/lib/types";

export function Solutions() {
  const solutions: Solution[] = [
    {
      id: "sales-forecasting",
      title: "Sales Forecasting",
      description: "Predict future sales trends with 95% accuracy using advanced ML algorithms and historical data analysis.",
      icon: "TrendingUp",
      iconColor: "bg-primary",
      features: ["Real-time predictions", "Seasonal adjustments", "Multi-channel integration"]
    },
    {
      id: "customer-segmentation",
      title: "Customer Segmentation",
      description: "Identify high-value customers and create targeted marketing campaigns that convert.",
      icon: "Users",
      iconColor: "bg-accent",
      features: ["Behavioral analysis", "Purchase patterns", "Personalized recommendations"]
    },
    {
      id: "inventory-optimization",
      title: "Inventory Optimization",
      description: "Reduce waste and maximize profits with AI-driven inventory management and demand planning.",
      icon: "Package",
      iconColor: "bg-success",
      features: ["Demand forecasting", "Auto-reordering", "Waste reduction"]
    },
    {
      id: "dynamic-pricing",
      title: "Dynamic Pricing",
      description: "Optimize pricing strategies in real-time based on market conditions, demand, and competitor analysis.",
      icon: "Tag",
      iconColor: "bg-purple-500",
      features: ["Competitor monitoring", "Demand-based pricing", "Profit maximization"]
    },
    {
      id: "market-intelligence",
      title: "Market Intelligence",
      description: "Stay ahead of trends with comprehensive market analysis and competitive intelligence.",
      icon: "Search",
      iconColor: "bg-orange-500",
      features: ["Trend analysis", "Market insights", "Competitive analysis"]
    },
    {
      id: "customer-retention",
      title: "Customer Retention",
      description: "Predict customer churn and implement targeted retention strategies to maximize lifetime value.",
      icon: "Heart",
      iconColor: "bg-red-500",
      features: ["Churn prediction", "Loyalty programs", "Personalized offers"]
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
