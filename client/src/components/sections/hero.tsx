import { TrendingUp, ArrowRight, Play, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParallaxImage from "@/components/ui/parallax-image";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden py-20 min-h-screen flex items-center">
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
          alt="Modern business environment background"
          effect="combined"
          containerClassName="h-full"
          className="opacity-10"
          minScale={1}
          maxScale={1.05}
          minOpacity={0.05}
          maxOpacity={0.15}
          minTranslateY={0}
          maxTranslateY={-30}
          scrollSensitivity={0.3}
          transitionDuration={0.6}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/90 via-pink-50/90 to-yellow-50/90"></div>
      </div>

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
              👋 Hey! We're <span className="text-wegic-purple font-bold">Motivio</span>.
              Chat with us, share your retail vision, and we'll boost your sales in 1 minute.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="btn-special-glow"
              >
                <Zap className="mr-3 h-6 w-6" />
                Start Growing Via Chat
              </Button>
              <Button
                variant="outline"
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
                <div className="text-3xl font-black text-wegic-purple mb-1">50+</div>
                <div className="text-xs text-gray-600 font-medium">Countries</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 card-hover">
                <div className="text-3xl font-black text-wegic-pink mb-1">25K+</div>
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

          {/* Enhanced Wegic-style interactive visual */}
          <div className="lg:order-last relative flex justify-center lg:justify-end">
            <div className="relative chat-container group">
              {/* Main chat interface mockup with enhanced styling */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 lg:p-8 transform hover:scale-105 transition-all duration-500 border border-wegic-purple/20 hover:border-wegic-purple/40 hover:shadow-3xl">
                {/* Chat messages container */}
                <div className="space-y-4 mb-6">
                  {/* AI Welcome Message */}
                  <div className="flex items-start space-x-3 chat-message-left animate-slide-in-left">
                    <div className="w-8 h-8 bg-wegic-purple-enhanced rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg flex-shrink-0 ring-2 ring-white/50">
                      AI
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[240px] shadow-sm border border-gray-200/50">
                      <p className="text-sm text-gray-800 leading-relaxed chat-text font-medium">Hi! I'm your AI sales assistant. What's your retail goal? 🎯</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex items-start space-x-3 justify-end chat-message-right animate-slide-in-right">
                    <div className="gradient-wegic-bg rounded-2xl rounded-tr-sm p-3 shadow-lg max-w-[240px] hover:shadow-xl transition-shadow duration-300">
                      <p className="text-sm text-white leading-relaxed chat-text font-medium">Increase my fashion store sales by 40% this quarter</p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg flex-shrink-0 ring-2 ring-white/50">
                      You
                    </div>
                  </div>

                  {/* AI Analysis Response */}
                  <div className="flex items-start space-x-3 chat-message-left animate-slide-in-left">
                    <div className="w-8 h-8 bg-wegic-green-enhanced rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg flex-shrink-0 ring-2 ring-white/50">
                      AI
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[240px] shadow-sm border border-gray-200/50">
                      <p className="text-sm text-gray-800 leading-relaxed chat-text font-medium">Perfect! I'll analyze your data and create a growth strategy. ✨</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Growth Prediction Panel */}
                <div className="bg-gradient-to-br from-wegic-green/10 via-wegic-blue/10 to-wegic-green/15 rounded-2xl p-5 border border-wegic-green/30 shadow-inner backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      <span className="text-lg">🚀</span>
                      Growth Prediction
                    </h4>
                    <div className="flex items-center gap-1">
                      <span className="text-wegic-green-enhanced font-bold text-lg animate-pulse">+42%</span>
                      <div className="w-2 h-2 bg-wegic-green-enhanced rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Current Revenue</span>
                      <span className="font-bold text-gray-900 bg-white/50 px-2 py-1 rounded-lg">$85K</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Projected Revenue</span>
                      <span className="font-bold text-wegic-green-enhanced bg-wegic-green/10 px-2 py-1 rounded-lg">$120K</span>
                    </div>

                    {/* Enhanced progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-4 shadow-inner overflow-hidden">
                      <div className="gradient-wegic-alt h-3 rounded-full animate-pulse shadow-sm relative overflow-hidden" style={{ width: "85%" }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced floating elements with better positioning */}
              <div className="absolute -top-4 -right-4 w-14 h-14 bg-wegic-yellow-enhanced rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl icon-container-enhanced z-10 hover:scale-110 transition-transform duration-300 cursor-pointer group-hover:animate-pulse">
                <Sparkles className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-wegic-pink-enhanced rounded-full flex items-center justify-center animate-float shadow-2xl icon-container-enhanced z-10 hover:scale-110 transition-transform duration-300 cursor-pointer group-hover:animate-bounce-slow">
                <Zap className="w-6 h-6 text-white drop-shadow-sm" />
              </div>

              {/* Additional floating accent */}
              <div className="absolute top-1/2 -left-6 w-8 h-8 bg-wegic-blue-enhanced rounded-full flex items-center justify-center animate-float shadow-xl icon-container-enhanced z-10 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '1s' }}>
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
