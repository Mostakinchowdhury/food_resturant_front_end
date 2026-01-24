export type Shop = {
  id: number;
  name: string;
  business_name: string;
  business_address: string;
  buesness_logo: string | null | number;
  buesness_logo_url: string | null;
  owner_photo: string | null | number;
  owner_photo_url: string | null;
  status: string;
};

export interface ShopResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Shop[];
  page_size: number;
  page: number;
  total_pages: number;
}

export type Shopdetail = {
  id: number;
  name: string;
  email: string;
  phone_num: string;
  business_name: string;
  business_address: string;
  business_type: string;
  website: string | null;
  description: string | null;
  buesness_logo: string | null | number;
  buesness_logo_url: string | null;

  owner_photo: string | null | number;
  owner_photo_url: string | null;
  status: string;
};
