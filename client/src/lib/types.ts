export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  features: string[];
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  color: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface Stats {
  value: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  businessType: string;
  message: string;
}
