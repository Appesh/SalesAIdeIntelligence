import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Phone, Mail, MapPin, Calendar, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ContactFormData } from "@/lib/types";

export default function ContactUs() {
  useEffect(() => {
    document.title = "Contact SalesAIde - Schedule Your Demo | Get Started with AI Retail Growth";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ready to transform your retail business? Contact SalesAIde for a personalized demo and consultation. Our team responds within 24 hours. Start your 40% sales growth journey today.');
    }
  }, []);

  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    businessType: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted Successfully!",
        description: "Our team will contact you within 24 hours to schedule your personalized demo.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        businessType: "",
        message: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Error submitting request",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company || !formData.phone || !formData.businessType) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                Ready to Elevate Your <span className="text-primary">Retail Sales?</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Take the first step toward transforming your retail business with AI-powered growth strategies. Schedule a personalized demo and discover how SalesAIde can increase your sales by 40% while simplifying your operations.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-primary">
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Free Demo • No Commitment • See Results in 24 Hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Get in Touch with Our Growth Experts
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our team of AI specialists and retail experts is ready to show you exactly how SalesAIde can transform your business. Choose the contact method that works best for you.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Call Us Directly</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Our Team</h3>
                      <p className="text-gray-600">info@salesaide.com</p>
                      <p className="text-sm text-gray-500">Response within 4 hours during business days</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Visit Our Office</h3>
                      <p className="text-gray-600">123 Innovation Drive, Suite 400</p>
                      <p className="text-gray-600">San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>

                {/* What to Expect */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="text-primary mr-2" size={20} />
                    What Happens Next?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Quick Response</p>
                        <p className="text-gray-600 text-sm">Our team will contact you within 24 hours to understand your specific needs</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Personalized Demo</p>
                        <p className="text-gray-600 text-sm">30-minute live demonstration using your actual business data and scenarios</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Growth Strategy</p>
                        <p className="text-gray-600 text-sm">Customized AI implementation plan with projected ROI for your business</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Demo</h3>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="business-type">Business Type *</Label>
                    <Select onValueChange={(value) => handleInputChange("businessType", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                        <SelectItem value="electronics">Electronics & Tech</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="beauty">Health & Beauty</SelectItem>
                        <SelectItem value="sports">Sports & Fitness</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="books">Books & Media</SelectItem>
                        <SelectItem value="toys">Toys & Games</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell Us About Your Goals</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="What challenges are you facing? What growth goals do you want to achieve? (Optional)"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-secondary text-lg py-4"
                    size="lg"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Scheduling Demo..." : "Schedule Your Demo"}
                    <Calendar className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to receive communications from SalesAIde. 
                    No spam, unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>

            {/* Alternative CTA */}
            <div className="mt-20 bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Prefer to Talk Directly?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Skip the form and speak with one of our AI retail specialists right now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  size="lg"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now: +1 (555) 123-4567
                </Button>
                <Button
                  variant="outline"
                  className="btn-outline-white px-8 py-4 rounded-xl"
                  size="lg"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email: info@salesaide.com
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}