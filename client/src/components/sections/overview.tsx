import { Brain, BarChart3, Zap } from "lucide-react";

export function Overview() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            AI-Powered Retail Growth, <span className="gradient-wegic bg-clip-text text-transparent gradient-text-force">Simplified</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              Motivio revolutionizes retail sales by leveraging Generative AI and advanced Machine Learning algorithms to drive growth, even in traditionally slow months. Our platform analyzes your existing data and learns from sales patterns to deliver automated retail solutions that work.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Stop struggling with seasonal dips. Start experiencing effortless growth with data-driven insights that transform your retail strategy automatically.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 card-hover border border-white/20">
            <div className="w-20 h-20 bg-wegic-purple-enhanced rounded-xl flex items-center justify-center mx-auto mb-4 animate-float shadow-2xl icon-container-enhanced">
              <Brain className="text-white" size={36} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Intelligent Analysis
            </h3>
            <p className="text-gray-200">
              Advanced AI algorithms analyze your retail data to identify growth opportunities and optimize sales strategies automatically.
            </p>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 card-hover border border-white/20">
            <div className="w-20 h-20 bg-wegic-pink-enhanced rounded-xl flex items-center justify-center mx-auto mb-4 animate-bounce-slow shadow-2xl icon-container-enhanced">
              <BarChart3 className="text-white" size={36} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Predictive Insights
            </h3>
            <p className="text-gray-200">
              Get actionable forecasts and recommendations that help you stay ahead of market trends and customer behavior.
            </p>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 card-hover border border-white/20">
            <div className="w-20 h-20 bg-wegic-green-enhanced rounded-xl flex items-center justify-center mx-auto mb-4 animate-float shadow-2xl icon-container-enhanced">
              <Zap className="text-white" size={36} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Automated Optimization
            </h3>
            <p className="text-gray-200">
              Continuous learning and automatic adjustments ensure your retail strategy evolves with your business needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}