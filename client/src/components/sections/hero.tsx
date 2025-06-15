import { TrendingUp, ArrowRight, Play, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-20 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-wegic-purple rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-wegic-pink rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-wegic-yellow rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-wegic-green rounded-full opacity-20 animate-bounce-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-6 py-3 gradient-wegic-bg rounded-full text-sm font-bold text-white mb-8 animate-bounce-slow">
              <Sparkles className="mr-2 h-5 w-5" />
              <span>🚀 Proven Results: 40% Sales Growth</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight text-shadow-lg">
              Magic Your
              <br />
              <span className="gradient-wegic-text">Sales Growth</span>
              <br />
              <span className="text-4xl md:text-5xl font-bold">Chat by Chat</span>
            </h1>

            <p className="text-2xl text-gray-700 mb-10 leading-relaxed font-medium">
              👋 Hey! We're <span className="text-wegic-purple font-bold">SalesAIde</span>.
              Chat with us, share your retail vision, and we'll boost your sales in 1 minute.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Button
                onClick={scrollToContact}
                className="btn-enhanced text-white px-10 py-6 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300"
                size="lg"
              >
                <Zap className="mr-3 h-6 w-6" />
                Start Growing Via Chat
              </Button>
              <Button
                variant="outline"
                className="btn-outline-enhanced px-10 py-6 rounded-2xl font-bold text-lg transition-all duration-300"
                size="lg"
              >
                <Play className="mr-3 h-6 w-6" />
                Watch Magic Happen
              </Button>
            </div>

            {/* Wegic-style example cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-wegic-purple/20 card-hover">
                <div className="text-sm text-gray-600 mb-1">💼 Fashion retailer needs seasonal boost</div>
                <div className="font-semibold text-gray-900">Increase holiday sales by 40%</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-wegic-pink/20 card-hover">
                <div className="text-sm text-gray-600 mb-1">🏪 Electronics store wants automation</div>
                <div className="font-semibold text-gray-900">Automate inventory optimization</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 text-center">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 card-hover">
                <div className="text-3xl font-black text-wegic-purple mb-1">230</div>
                <div className="text-xs text-gray-600 font-medium">Countries</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 card-hover">
                <div className="text-3xl font-black text-wegic-pink mb-1">500K+</div>
                <div className="text-xs text-gray-600 font-medium">Sales Boosted</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 card-hover">
                <div className="text-3xl font-black text-wegic-green mb-1">80%</div>
                <div className="text-xs text-gray-600 font-medium">From Zero</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 card-hover">
                <div className="text-3xl font-black text-wegic-yellow mb-1">95%</div>
                <div className="text-xs text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Wegic-style interactive visual */}
          <div className="lg:order-last relative flex justify-center lg:justify-end">
            <div className="relative chat-container">
              {/* Main chat interface mockup */}
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 lg:p-8 transform hover:scale-105 transition-all duration-500 border border-wegic-purple/20">
                <div className="gradient-wegic-bg h-3 rounded-t-2xl mb-6"></div>

                {/* Chat messages */}
                <div className="space-y-4 mb-6">
                  {/* AI Message */}
                  <div className="flex items-start space-x-3 chat-message-left">
                    <div className="w-8 h-8 bg-wegic-purple-enhanced rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[240px]">
                      <p className="text-sm text-gray-800 leading-relaxed chat-text">Hi! I'm your AI sales assistant. What's your retail goal? 🎯</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex items-start space-x-3 justify-end chat-message-right">
                    <div className="gradient-wegic-bg rounded-2xl rounded-tr-sm p-3 shadow-lg max-w-[240px]">
                      <p className="text-sm text-white leading-relaxed chat-text">Increase my fashion store sales by 40% this quarter</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg flex-shrink-0">
                      You
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start space-x-3 chat-message-left">
                    <div className="w-8 h-8 bg-wegic-green-enhanced rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[240px]">
                      <p className="text-sm text-gray-800 leading-relaxed chat-text">Perfect! I'll analyze your data and create a growth strategy. ✨</p>
                    </div>
                  </div>
                </div>

                {/* Results preview */}
                <div className="bg-gradient-to-r from-wegic-green/15 to-wegic-blue/15 rounded-2xl p-4 border border-wegic-green/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900 text-sm">🚀 Growth Prediction</h4>
                    <span className="text-wegic-green-enhanced font-bold text-lg">+42%</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Current Revenue</span>
                      <span className="font-semibold text-gray-900">$85K</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Projected Revenue</span>
                      <span className="font-semibold text-wegic-green-enhanced">$120K</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                      <div className="gradient-wegic-alt h-2.5 rounded-full animate-pulse shadow-sm" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-wegic-yellow-enhanced rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl icon-container-enhanced z-10">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-wegic-pink-enhanced rounded-full flex items-center justify-center animate-float shadow-2xl icon-container-enhanced z-10">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
