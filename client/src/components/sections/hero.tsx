import { TrendingUp, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-primary mb-6">
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Boost Sales by 40% with AI</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Revolutionize Your <span className="text-primary">Retail Sales</span> with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform slow months into growth opportunities. Our AI analyzes your existing data and learns from sales patterns to drive consistent revenue growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToContact}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition-colors"
                size="lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors"
                size="lg"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">40%</div>
                <div className="text-sm text-gray-600">Sales Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Retail Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$2M+</div>
                <div className="text-sm text-gray-600">Revenue Generated</div>
              </div>
            </div>
          </div>
          <div className="lg:order-last">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-t-lg mb-4"></div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Sales Performance</h3>
                  <span className="text-success font-medium">+42%</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">Q1</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">$85K</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">Q2</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">$92K</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">Q3</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">$78K</div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 mt-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary rounded mr-2"></div>
                    <span className="text-sm text-gray-700">AI Prediction: Q4 growth +15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
