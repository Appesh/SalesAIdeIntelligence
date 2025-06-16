import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Award, Settings, TrendingUp, Zap, Shield, Users, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhyChooseUs() {
  useEffect(() => {
    document.title = "Why Choose SalesAIde - Your Partner in Retail Growth | AI Expertise & Proven Results";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover why 500+ retailers choose SalesAIde for AI-powered growth. Proven expertise, tailored solutions, year-round optimization, and dedicated support. See 40% sales increases with our retail AI platform.');
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
                Your Partner in Retail Growth: <span className="text-primary">The Motivio Advantage</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Motivio stands out as the premier AI-powered retail growth platform, combining cutting-edge technology with deep industry expertise. We deliver measurable results through proven methodologies, personalized solutions, and unwavering commitment to your success.
              </p>
            </div>
          </div>
        </section>

        {/* Differentiators Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Proven AI Expertise */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                    <Award className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Proven AI Expertise
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Our track record speaks for itself. With a team of specialized AI engineers, data scientists, and retail experts, SalesAIde brings innovative AI solutions that have transformed hundreds of retail businesses. Our robust and reliable platform is built on years of deep technical knowledge and real-world experience.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">5+ Years of AI Innovation:</strong>
                        <span className="text-gray-600"> Pioneering retail AI solutions with continuous research and development in machine learning algorithms</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Team of 50+ Specialists:</strong>
                        <span className="text-gray-600"> PhD-level data scientists, AI engineers, and retail industry experts dedicated to your success</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Enterprise-Grade Reliability:</strong>
                        <span className="text-gray-600"> 99.9% uptime with bank-level security and SOC 2 compliance for complete peace of mind</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">500+ Successful Implementations:</strong>
                        <span className="text-gray-600"> Proven results across diverse retail sectors with an average 40% sales increase</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:order-last">
                  <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                    <h4 className="font-semibold text-gray-900 mb-6">Our Expertise by the Numbers</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">95%</div>
                        <div className="text-gray-600">Prediction Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent mb-2">500+</div>
                        <div className="text-gray-600">Retail Clients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-success mb-2">$50M+</div>
                        <div className="text-gray-600">Revenue Generated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-500 mb-2">99.9%</div>
                        <div className="text-gray-600">Platform Uptime</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-center">
                        <Shield className="text-primary mr-2" size={20} />
                        <span className="text-gray-700 font-medium">SOC 2 Certified & Bank-Level Security</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tailored Solutions */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-first">
                  <div className="bg-gradient-to-br from-accent to-primary rounded-2xl p-8 text-white">
                    <h4 className="font-semibold mb-6">Customization Process</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-primary font-bold text-sm">1</span>
                        </div>
                        <div>
                          <div className="font-medium mb-1">Initial Consultation</div>
                          <div className="text-blue-100 text-sm">Deep dive into your business model, challenges, and growth objectives</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-primary font-bold text-sm">2</span>
                        </div>
                        <div>
                          <div className="font-medium mb-1">Data Integration</div>
                          <div className="text-blue-100 text-sm">Seamless connection with your existing systems and historical data analysis</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-primary font-bold text-sm">3</span>
                        </div>
                        <div>
                          <div className="font-medium mb-1">Custom AI Training</div>
                          <div className="text-blue-100 text-sm">AI models trained specifically on your unique data patterns and market dynamics</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-primary font-bold text-sm">4</span>
                        </div>
                        <div>
                          <div className="font-medium mb-1">Continuous Refinement</div>
                          <div className="text-blue-100 text-sm">Ongoing optimization based on performance data and market changes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-18 h-18 bg-accent rounded-xl flex items-center justify-center mb-6 icon-btn-enhanced animate-float">
                    <Settings className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Tailored Solutions, Not Generic Advice
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Unlike one-size-fits-all solutions, SalesAIde creates customized AI strategies built specifically for your unique data, market conditions, and business objectives. Our comprehensive customization process ensures optimal performance from day one.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Your Data, Your Advantage:</strong>
                        <span className="text-gray-600"> AI models trained exclusively on your historical sales, customer behavior, and market patterns</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Market-Specific Optimization:</strong>
                        <span className="text-gray-600"> Solutions calibrated to your geographic location, customer demographics, and industry dynamics</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Business Model Integration:</strong>
                        <span className="text-gray-600"> AI strategies aligned with your specific retail format, pricing model, and operational structure</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Adaptive Learning System:</strong>
                        <span className="text-gray-600"> Continuous refinement ensures your AI solution evolves with your business and market changes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Year-Round Optimization */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center mb-6">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Year-Round Optimization & Sustainable Growth
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    SalesAIde delivers continuous performance improvement through ongoing support, real-time monitoring, and adaptive optimization. Our commitment to your long-term success ensures sustainable growth that adapts to market changes and evolving business needs.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">24/7 Performance Monitoring:</strong>
                        <span className="text-gray-600"> Real-time tracking of key metrics with automatic alerts for optimization opportunities</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Seasonal Adaptation:</strong>
                        <span className="text-gray-600"> AI strategies that automatically adjust to seasonal patterns, holidays, and market fluctuations</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Dedicated Success Team:</strong>
                        <span className="text-gray-600"> Personal account managers and AI specialists providing ongoing support and strategic guidance</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Future-Ready Platform:</strong>
                        <span className="text-gray-600"> Regular updates and new features ensure your AI advantage stays ahead of the competition</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:order-last">
                  <div className="bg-slate-50 rounded-2xl p-6 border">
                    <h4 className="font-semibold text-gray-900 mb-4">Continuous Improvement Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-gray-600">Monthly Performance Reviews</span>
                        <span className="text-success font-semibold">✓ Included</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-gray-600">Real-Time Optimization</span>
                        <span className="text-success font-semibold">24/7 Active</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-gray-600">Dedicated Support</span>
                        <span className="text-success font-semibold">Personal Team</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-gray-600">Platform Updates</span>
                        <span className="text-success font-semibold">Monthly</span>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-success to-primary rounded-lg text-white text-center">
                      <div className="font-semibold mb-1">Average Annual Growth</div>
                      <div className="text-2xl font-bold">+40% Sales</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Focus on Business */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-first">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-6">What You Handle vs. What We Handle</h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-medium text-primary mb-3">You Focus On:</h5>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center">
                            <Users className="text-primary mr-2" size={16} />
                            <span>Serving your customers</span>
                          </li>
                          <li className="flex items-center">
                            <TrendingUp className="text-primary mr-2" size={16} />
                            <span>Growing your business</span>
                          </li>
                          <li className="flex items-center">
                            <Award className="text-primary mr-2" size={16} />
                            <span>Building your brand</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-accent mb-3">We Handle:</h5>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center">
                            <Settings className="text-accent mr-2" size={16} />
                            <span>AI algorithm optimization</span>
                          </li>
                          <li className="flex items-center">
                            <Settings className="text-accent mr-2" size={16} />
                            <span>Data processing & analysis</span>
                          </li>
                          <li className="flex items-center">
                            <Settings className="text-accent mr-2" size={16} />
                            <span>Technical infrastructure</span>
                          </li>
                          <li className="flex items-center">
                            <Settings className="text-accent mr-2" size={16} />
                            <span>System maintenance & updates</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Focus on Your Business, We Handle the AI
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Why burden yourself with technical complexities when you could be growing your business? SalesAIde takes care of all AI-related technical aspects, allowing you to focus on what you do best while we ensure your AI systems run flawlessly behind the scenes.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Zero Technical Overhead:</strong>
                        <span className="text-gray-600"> No need to hire AI specialists or manage complex infrastructure - we handle everything</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Seamless Integration:</strong>
                        <span className="text-gray-600"> Our solutions work invisibly in the background without disrupting your daily operations</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Expert Management:</strong>
                        <span className="text-gray-600"> Our technical team ensures optimal performance while you concentrate on strategic business decisions</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="text-success mr-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <strong className="text-gray-900">Simplified Insights:</strong>
                        <span className="text-gray-600"> Complex AI outputs translated into clear, actionable business recommendations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                The SalesAIde Promise: Your Success is Our Success
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                SalesAIde provides more than just AI technology - we deliver a comprehensive partnership for retail growth. With proven expertise, tailored solutions, continuous optimization, and complete technical management, we ensure your business thrives while you focus on what matters most. Join the 500+ retailers who have transformed their sales performance with SalesAIde's intelligent automation.
              </p>
              <Button
                onClick={scrollToContact}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                size="lg"
              >
                Start Your Success Story
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