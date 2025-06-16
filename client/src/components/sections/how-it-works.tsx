import type { ProcessStep } from "@/lib/types";

export function HowItWorks() {
  const steps: ProcessStep[] = [
    {
      number: 1,
      title: "Connect & Automate",
      description: "Link your existing systems in minutes. Motivio automatically starts analyzing your retail data with zero manual setup required.",
      color: "bg-primary"
    },
    {
      number: 2,
      title: "AI Learns & Optimizes",
      description: "Our generative AI marketing algorithms identify patterns and opportunities in your sales data, creating personalized growth strategies.",
      color: "bg-accent"
    },
    {
      number: 3,
      title: "Growth Happens Automatically",
      description: "Get data-driven insights and automated seasonal campaigns that boost sales during slow periods. No ongoing management needed.",
      color: "bg-success"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works: 3 Steps to Automated Growth
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start seeing results in days, not months. Our machine learning for sales platform does the heavy lifting while you focus on running your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white font-bold text-xl">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Real-Time Dashboard</h3>
              <p className="text-gray-600">
                Monitor your business performance with our intuitive dashboard that provides real-time insights and predictive analytics.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-gray-700">Live sales tracking and forecasting</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-700">Customer behavior analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  <span className="text-gray-700">Inventory optimization alerts</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Automated reporting</span>
                </div>
              </div>
            </div>
            <div className="lg:order-last">
              <div className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Sales Overview</h4>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Today's Sales</div>
                    <div className="text-2xl font-bold text-gray-900">$12,540</div>
                    <div className="text-sm text-success">+8.2%</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Conversion Rate</div>
                    <div className="text-2xl font-bold text-gray-900">3.2%</div>
                    <div className="text-sm text-success">+0.5%</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-2">Weekly Trend</div>
                  <div className="flex items-end space-x-1 h-16">
                    <div className="bg-primary w-4 h-8 rounded-t"></div>
                    <div className="bg-primary w-4 h-12 rounded-t"></div>
                    <div className="bg-primary w-4 h-6 rounded-t"></div>
                    <div className="bg-primary w-4 h-16 rounded-t"></div>
                    <div className="bg-primary w-4 h-10 rounded-t"></div>
                    <div className="bg-primary w-4 h-14 rounded-t"></div>
                    <div className="bg-accent w-4 h-12 rounded-t"></div>
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
