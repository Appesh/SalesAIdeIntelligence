import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrendingUp, Calendar, Sparkles, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Solutions() {
  useEffect(() => {
    document.title = "AI Solutions for Retail Growth - SalesAIde | Sales Forecasting & Automation";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover SalesAIde\'s comprehensive AI-powered retail solutions: intelligent sales boosting, smart seasonal campaigns, and automated content creation. Increase revenue by 40% with our proven retail AI platform.');
    }
  }, []);
  const navigateToContact = () => {
    window.location.href = "/contact-us";
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                SalesAIde's AI-Powered <span className="text-primary">Retail Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Transform your retail business with comprehensive AI solutions that automate growth, optimize performance, and maximize profits. Our intelligent platform delivers measurable results across every aspect of your retail operations.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Solution 1: Intelligent Sales Boosting */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Intelligent Sales Boosting
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    SalesAIde's AI continuously analyzes your sales data to uncover hidden revenue opportunities and generate targeted, data-driven strategies that deliver maximum returns with minimal effort.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Precise Pricing Optimization:</strong>
                        <span className="text-gray-600"> Automatically adjust prices based on demand patterns, competitor analysis, and market conditions to maximize profit margins on every product</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Cross-Selling Intelligence:</strong>
                        <span className="text-gray-600"> Identify perfect product combinations and automatically suggest complementary items that increase average order value by 35%</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Niche Demand Prediction:</strong>
                        <span className="text-gray-600"> Predict demand shifts for specialty items before competitors, allowing you to capitalize on emerging trends and seasonal variations</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Inventory Optimization:</strong>
                        <span className="text-gray-600"> Eliminate overstock and stockouts with AI-driven demand forecasting that adapts to real-time market changes</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="lg:order-last">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 border">
                    <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-t-lg mb-4"></div>
                    <h4 className="font-semibold text-gray-900 mb-4">Revenue Opportunities Identified</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cross-sell Potential</span>
                        <span className="font-semibold text-success">+$12,540</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Price Optimization</span>
                        <span className="font-semibold text-success">+$8,920</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Demand Prediction</span>
                        <span className="font-semibold text-success">+$6,380</span>
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">Total Monthly Boost</span>
                          <span className="font-bold text-primary text-lg">+$27,840</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 2: Smart Seasonal Campaigns */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-first">
                  <div className="bg-gradient-to-br from-accent to-primary rounded-2xl p-8 text-white">
                    <h4 className="font-semibold mb-6">Seasonal Campaign Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium">Summer Swimwear Launch</div>
                          <div className="text-blue-100 text-sm">Peak demand: May 15-20</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium">Back-to-School Campaign</div>
                          <div className="text-blue-100 text-sm">Optimal start: July 28</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium">Winter Coat Promotion</div>
                          <div className="text-blue-100 text-sm">Launch: Sept 10 (pre-season)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6">
                    <Calendar className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Smart Seasonal Campaigns
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Never miss a sales opportunity again. SalesAIde's AI predicts seasonal shifts and market trends with precision, automatically timing your campaigns and product releases for maximum impact.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Perfect Timing Intelligence:</strong>
                        <span className="text-gray-600"> Launch summer swimwear precisely when demand peaks, promoting winter coats before the first cold snap hits your market</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Trend-Based Product Launches:</strong>
                        <span className="text-gray-600"> Automatically identify emerging trends and optimize new product releases to capture market demand before competitors</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Weather-Responsive Campaigns:</strong>
                        <span className="text-gray-600"> Adapt marketing messages and product focus based on weather forecasts and seasonal patterns specific to your location</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Market Shift Adaptation:</strong>
                        <span className="text-gray-600"> Continuously monitor market trends and automatically adjust campaign strategies to capitalize on changing consumer behavior</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Solution 3: Content Creation */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center mb-6">
                    <Sparkles className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Content Creation for Enhanced Engagement
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Stay ahead of the curve with SalesAIde's Generative AI that creates compelling, high-quality marketing content at scale. Produce content that resonates with customers and drives conversions automatically.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Hyper-Personalized Email Campaigns:</strong>
                        <span className="text-gray-600"> Generate compelling subject lines and email content tailored to individual customer preferences and purchase history</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Dynamic Ad Copy Variations:</strong>
                        <span className="text-gray-600"> Create multiple ad variations automatically, testing and optimizing performance across different audiences and platforms</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Engaging Product Descriptions:</strong>
                        <span className="text-gray-600"> Transform basic product information into compelling, SEO-optimized descriptions that highlight benefits and drive purchases</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Social Media Content at Scale:</strong>
                        <span className="text-gray-600"> Generate consistent, brand-aligned social media posts, stories, and captions that maintain engagement across all platforms</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="lg:order-last">
                  <div className="bg-slate-50 rounded-2xl p-6 border">
                    <h4 className="font-semibold text-gray-900 mb-4">AI-Generated Content Examples</h4>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border-l-4 border-primary">
                        <div className="text-sm text-gray-500 mb-1">Email Subject Line</div>
                        <div className="text-gray-900">"Sarah, your favorite summer styles are 40% off (limited time!)"</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-accent">
                        <div className="text-sm text-gray-500 mb-1">Ad Copy</div>
                        <div className="text-gray-900">"Transform your workspace with ergonomic solutions that boost productivity by 25%"</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-success">
                        <div className="text-sm text-gray-500 mb-1">Social Media</div>
                        <div className="text-gray-900">"Monday motivation: Start your week with confidence in our bestselling business attire ✨"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Retail Business?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Start your free trial and see how SalesAIde's AI solutions can boost your sales by 40% in the first month.
              </p>
              <Button
                onClick={navigateToContact}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                size="lg"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}