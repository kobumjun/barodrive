export type PricingItem = {
  id: string;
  key: "self_car_10h" | "sedan_10h" | "suv_10h";
  label: string;
  price: number;
  updated_at?: string;
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  training_type: string;
  region: string;
  desired_schedule: string;
  message: string;
  status: string;
  created_at: string;
};

export type Review = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_name: string;
  created_at: string;
  image_url: string;
  storage_path?: string | null;
  is_published: boolean;
  views?: number;
};

export type FAQItem = {
  question: string;
  answer: string;
};
