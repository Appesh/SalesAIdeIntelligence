import { Brain, BarChart3, Zap } from "lucide-react";

export function Overview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            AI-Powered Retail Growth, Simplified
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              SalesAIde revolutionizes retail sales by leveraging Generative AI and advanced Machine Learning algorithms to drive growth, even in traditionally slow months. Our platform analyzes your existing data and learns from sales patterns to deliver automated retail solutions that work.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stop struggling with seasonal dips. Start experiencing effortless growth with data-driven insights that transform your retail strategy automatically.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              **Intelligent Analysis**
            </h3>
            <p className="text-gray-600">
              Advanced AI algorithms analyze your retail data to identify growth opportunities and optimize sales strategies automatically.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              **Predictive Insights**
            </h3>
            <p className="text-gray-600">
              Get actionable forecasts and recommendations that help you stay ahead of market trends and customer behavior.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              **Automated Optimization**
            </h3>
            <p className="text-gray-600">
              Continuous learning and automatic adjustments ensure your retail strategy evolves with your business needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}