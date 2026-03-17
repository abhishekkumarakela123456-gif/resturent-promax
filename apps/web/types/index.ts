export type RestaurantPayload = {
  restaurant: { _id: string; name: string; tagline?: string; subdomain: string };
  featured: Array<{ _id: string; name: string; price: number; imageUrl?: string }>;
  offers: Array<{ _id: string; title: string; description?: string }>;
  recommended: Array<{ _id: string; name: string; price: number }>;
  settings?: {
    theme?: { primary?: string; secondary?: string };
    homepageSections?: Record<string, boolean>;
  };
};
