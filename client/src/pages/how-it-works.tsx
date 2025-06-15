import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Database, Sparkles, Target, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  useEffect(() => {
    document.title = "How SalesAIde Works - AI Integration Process | 3 Steps to Retail Growth";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how SalesAIde\'s 3-step AI process transforms retail data into automated growth. Data analysis, content generation, and continuous optimization for 40% sales increases.');
    }
  }, []);
  const scrollToContact = () => {
    window.location.href = "/#contact";
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
                The SalesAIde Process: <span className="text-primary">Seamless AI Integration</span> for Retail
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover the simplicity and effectiveness of the SalesAIde process. Our three-step approach transforms your retail data into automated growth strategies that deliver measurable results from day one.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Step 1: Data-Driven Insights */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                      <Database className="text-white" size={32} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Step 1: Data-Driven Insights
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    SalesAIde's proprietary AI analyzes your comprehensive business data to uncover hidden patterns and opportunities. Our advanced algorithms process multiple data streams to deliver actionable, clearly presented insights that drive immediate results.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <h4 className="text-xl font-semibold text-gray-900">Historical Sales and Market Trends Analysis:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Transaction Data:</strong>
                          <span className="text-gray-600"> Complete purchase history, payment methods, order values, and customer lifetime patterns</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Customer Demographics:</strong>
                          <span className="text-gray-600"> Age groups, geographic locations, shopping preferences, and behavioral segmentation data</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Competitor Pricing:</strong>
                          <span className="text-gray-600"> Real-time competitor analysis, market positioning, and pricing strategy benchmarks</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Local Market Indicators:</strong>
                          <span className="text-gray-600"> Economic conditions, seasonal trends, regional preferences, and demographic shifts</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-primary mb-2">SalesAIde's Analytical Process:</h5>
                    <p className="text-gray-700">
                      Our proprietary AI engine processes over 200 data points per customer interaction, identifying micro-trends and macro-patterns that traditional analytics miss. The result: actionable insights presented in clear, executive-ready dashboards that guide immediate strategic decisions.
                    </p>
                  </div>
                </div>
                <div className="lg:order-last">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 border">
                    <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-t-lg mb-4"></div>
                    <h4 className="font-semibold text-gray-900 mb-4">Data Analysis Dashboard</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Data Points Analyzed</div>
                          <div className="text-xl font-bold text-primary">2.4M+</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Accuracy Rate</div>
                          <div className="text-xl font-bold text-success">95.7%</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Transaction Analysis</span>
                          <span className="text-success">✓ Complete</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Market Trends</span>
                          <span className="text-success">✓ Complete</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Competitor Intelligence</span>
                          <span className="text-success">✓ Complete</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Customer Segmentation</span>
                          <span className="text-accent">Processing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Generative AI for Content */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-first">
                  <div className="bg-gradient-to-br from-accent to-primary rounded-2xl p-8 text-white">
                    <h4 className="font-semibold mb-6">Content Generation Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-1 bg-white rounded mr-3"></div>
                        <div>
                          <div className="font-medium">Email Campaigns</div>
                          <div className="text-blue-100 text-sm">Generated in 2 minutes</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-1 bg-white rounded mr-3"></div>
                        <div>
                          <div className="font-medium">Product Descriptions</div>
                          <div className="text-blue-100 text-sm">50 descriptions in 5 minutes</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-1 bg-white rounded mr-3"></div>
                        <div>
                          <div className="font-medium">Social Media Content</div>
                          <div className="text-blue-100 text-sm">Weekly content in 3 minutes</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-1 bg-white rounded mr-3"></div>
                        <div>
                          <div className="font-medium">Ad Copy Variations</div>
                          <div className="text-blue-100 text-sm">10 variations in 1 minute</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-blue-300">
                      <div className="text-center">
                        <div className="text-2xl font-bold">Weeks → Minutes</div>
                        <div className="text-blue-100">Content creation acceleration</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center">
                      <Sparkles className="text-white" size={32} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Step 2: Generative AI for Content
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Accelerate content creation from weeks to minutes with SalesAIde. Our Generative AI produces fresh, high-quality marketing content that perfectly aligns with your business goals and resonates with your target customers.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <h4 className="text-xl font-semibold text-gray-900">Fresh, AI-Generated Content Production:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Brand-Aligned Messaging:</strong>
                          <span className="text-gray-600"> Every piece of content maintains your unique brand voice and aligns with your strategic business objectives</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Customer-Centric Content:</strong>
                          <span className="text-gray-600"> Content tailored to specific customer segments, addressing their unique needs, preferences, and pain points</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Multi-Channel Optimization:</strong>
                          <span className="text-gray-600"> Content automatically optimized for different platforms - email, social media, web, and advertising channels</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Performance-Driven Creation:</strong>
                          <span className="text-gray-600"> Content designed for maximum engagement and conversion rates based on historical performance data</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-semibold text-success mb-2">Efficiency Breakthrough:</h5>
                    <p className="text-gray-700">
                      <strong>Accelerate content creation from weeks to minutes with SalesAIde.</strong> Our AI generates personalized email campaigns, product descriptions, social media posts, and ad copy variations at unprecedented speed while maintaining quality and brand consistency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Strategic Timing & Continuous Optimization */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center">
                      <Target className="text-white" size={32} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Step 3: Strategic Timing & Continuous Optimization
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    SalesAIde's predictive algorithms determine optimal release windows for maximum impact. Our system continuously monitors performance, learns from real-time data, and refines strategies to ensure sustained growth and competitive advantage.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <h4 className="text-xl font-semibold text-gray-900">Predictive Algorithms for Optimal Timing:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Campaign Launch Optimization:</strong>
                          <span className="text-gray-600"> AI determines the precise moment to launch campaigns for maximum customer engagement and conversion rates</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Product Release Timing:</strong>
                          <span className="text-gray-600"> Strategic timing for new product launches based on market readiness, seasonal patterns, and competitor analysis</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Price Adjustment Windows:</strong>
                          <span className="text-gray-600"> Optimal timing for pricing changes to maximize revenue while maintaining customer satisfaction</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <strong className="text-gray-900">Inventory Management Cycles:</strong>
                          <span className="text-gray-600"> Perfect timing for restocking, clearance sales, and inventory adjustments based on predicted demand</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-600 mb-2">Continuous Optimization Commitment:</h5>
                    <p className="text-gray-700">
                      <strong>SalesAIde isn't a one-off solution.</strong> Our system continuously monitors performance, learns from real-time data, and refines strategies to adapt to changing market conditions, customer behavior, and business objectives. Your competitive advantage grows stronger every day.
                    </p>
                  </div>
                </div>
                <div className="lg:order-last">
                  <div className="bg-slate-50 rounded-2xl p-6 border">
                    <h4 className="font-semibold text-gray-900 mb-4">Optimization Cycle</h4>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border-l-4 border-primary">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Real-Time Monitoring</span>
                          <span className="text-primary text-sm">24/7 Active</span>
                        </div>
                        <div className="text-gray-600 text-sm">Tracking performance across all channels and touchpoints</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-accent">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Data Learning</span>
                          <span className="text-accent text-sm">Continuous</span>
                        </div>
                        <div className="text-gray-600 text-sm">Processing new patterns and customer behavior changes</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-success">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Strategy Refinement</span>
                          <span className="text-success text-sm">Weekly Updates</span>
                        </div>
                        <div className="text-gray-600 text-sm">Automatic adjustments to optimize performance</div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-primary to-accent rounded-lg text-white text-center">
                      <div className="font-semibold mb-1">Average Performance Improvement</div>
                      <div className="text-2xl font-bold">+15% Monthly</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-gray-50 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The SalesAIde Advantage
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Our three-step process delivers measurable results from day one, with continuous improvement that keeps your business ahead of the competition.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-gray-600">Prediction Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">40%</div>
                  <div className="text-gray-600">Average Sales Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success mb-2">24/7</div>
                  <div className="text-gray-600">Continuous Optimization</div>
                </div>
              </div>
              <Button
                onClick={scrollToContact}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition-colors"
                size="lg"
              >
                Experience the SalesAIde Process
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