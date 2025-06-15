import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Building, Phone, Mail } from 'lucide-react';

interface LeadCaptureFormProps {
  onSubmit: (data: LeadFormData) => void;
  onCancel: () => void;
}

interface LeadFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  businessType: string;
  interests: string[];
}

export function LeadCaptureForm({ onSubmit, onCancel }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    businessType: '',
    interests: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company || !formData.businessType) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-purple-200">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Let's Get You Started!
        </h3>
        <p className="text-sm text-gray-600">
          Just a few quick details so I can personalize your experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="name" className="text-xs font-medium text-gray-700">
              Full Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your name"
                className="pl-10 h-9 text-sm"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-xs font-medium text-gray-700">
              Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                className="pl-10 h-9 text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="company" className="text-xs font-medium text-gray-700">
            Company Name *
          </Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Your company"
              className="pl-10 h-9 text-sm"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="text-xs font-medium text-gray-700">
            Phone (Optional)
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="pl-10 h-9 text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="business-type" className="text-xs font-medium text-gray-700">
            Business Type *
          </Label>
          <Select onValueChange={(value) => handleInputChange('businessType', value)} required>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select your business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fashion">Fashion & Apparel</SelectItem>
              <SelectItem value="electronics">Electronics & Tech</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
              <SelectItem value="beauty">Health & Beauty</SelectItem>
              <SelectItem value="sports">Sports & Recreation</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-medium text-gray-700 mb-2 block">
            What interests you most? (Select all that apply)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Sales Growth',
              'Inventory Optimization',
              'Customer Analytics',
              'Process Automation',
              'Pricing Strategy',
              'Marketing Insights'
            ].map((interest) => (
              <Button
                key={interest}
                type="button"
                variant={formData.interests.includes(interest) ? "default" : "outline"}
                size="sm"
                className={`text-xs h-8 ${
                  formData.interests.includes(interest)
                    ? 'bg-gradient-to-r from-primary to-accent text-white'
                    : 'hover:bg-primary hover:text-white'
                }`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 h-9 text-sm"
            disabled={isSubmitting}
          >
            Continue Chatting
          </Button>
          <Button
            type="submit"
            className="flex-1 h-9 text-sm bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.businessType}
          >
            {isSubmitting ? 'Submitting...' : 'Get My Personalized Plan'}
          </Button>
        </div>
      </form>

      <p className="text-xs text-gray-500 text-center mt-3">
        🔒 Your information is secure and will only be used to provide you with relevant SalesAIde information
      </p>
    </div>
  );
}
