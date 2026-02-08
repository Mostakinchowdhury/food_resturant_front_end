export interface overview {
  rider_count: number;
  order_count: number;
  partner_count: number;
  product_count: number;
}

export interface topcategories {
  id: number;
  name: string;
  description: string;
  image: string | null;
  total_quantity: number;
  image_url: string;
}

export interface top6cattype {
  top_categories: topcategories[];
}
