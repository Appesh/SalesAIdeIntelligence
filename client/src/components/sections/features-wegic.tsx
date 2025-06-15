import { Zap, Edit3, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  image: string;
}

const features: FeatureStep[] = [
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: "Analyze in 10s",
    description: "Just tell us about your business and we'll instantly analyze your sales patterns and opportunities",
    bgColor: "bg-wegic-purple",
    image: "⚡"
  },
  {
    icon: <Edit3 className="w-8 h-8 text-white" />,
    title: "Optimize easily", 
    description: "Our AI creates personalized strategies and campaigns that you can review and adjust with simple chat commands",
    bgColor: "bg-wegic-pink",
    image: "✨"
  },
  {
    icon: <Globe className="w-8 h-8 text-white" />,
    title: "Grow in 1 click",
    description: "Deploy your optimized sales strategies across all channels and watch your revenue grow automatically",
    bgColor: "bg-wegic-green", 
    image: "🚀"
  }
];

export function FeaturesWegic() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-wegic-purple/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-wegic-pink/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-wegic-yellow/10 rounded-full animate-float"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Features
          </h2>
          <h3 className="text-3xl font-bold text-gray-700 mb-8">
            Anything you want, just tell your AI team
          </h3>
        </div>

        {/* Feature steps */}
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl card-hover border border-gray-100">
                    <div className="text-center mb-6">
                      <div className={`w-18 h-18 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 icon-btn-enhanced animate-float`}>
                        {feature.icon}
                      </div>
                      <h4 className="text-2xl font-black text-gray-900 mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Mock interface */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-wegic-purple rounded-full flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <span className="text-gray-800">
                              {index === 0 && "Analyzing your sales data... ⚡"}
                              {index === 1 && "Creating optimization strategy... ✨"}
                              {index === 2 && "Deploying growth campaigns... 🚀"}
                            </span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-wegic-purple to-wegic-pink rounded-lg p-3 text-sm text-white">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">
                              {index === 0 && "Found 12 growth opportunities!"}
                              {index === 1 && "Strategy ready for review!"}
                              {index === 2 && "Campaign live - tracking results!"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} text-center`}>
                  <div className="text-9xl animate-float mb-8">
                    {feature.image}
                  </div>
                  {index < features.length - 1 && (
                    <div className="hidden lg:block">
                      <ArrowRight className="w-12 h-12 text-gray-300 mx-auto animate-bounce-slow" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-gray-100">
            <h3 className="text-4xl font-black text-gray-900 mb-4">
              "Let your AI team run your sales growth"
            </h3>
            <div className="space-y-4 mb-8">
              <p className="text-xl text-gray-700">✅ Auto-updating your strategies</p>
              <p className="text-xl text-gray-700">✅ Providing 24/7 optimization</p>
              <p className="text-xl text-gray-700">✅ Supporting your growth goals</p>
            </div>
            <Button className="gradient-wegic-bg text-white px-10 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
              Get your AI sales team now
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
