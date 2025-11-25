interface ProductImage {
    image_url: string;
}
export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  thumbnail_url: string;
  contact_phone: string;
  whatsapp_number: string;
  active: boolean;
  category: number;
  product_images: ProductImage[] | null;
  category_data: {
    id: number;
    name: string;
    slug: string;
  } | null;
  created_at: string; // ISO date string
  updated_at?: string; // optional
}
