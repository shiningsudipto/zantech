export interface TWishlist {
  product_id: number;
  name: string;
  product_slug: string;
  price: number;
  discount: number;
  image: string;
}

export interface TStats {
  total_orders: number;
  total_wishlists: number;
  total_addresses: number;
  total_spent: number;
}

export interface TAddress {
  id: number;
  User_id: string;
  f_name: string;
  l_name: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  created_at: string;
  updated_at: string;
}

export interface TOrder {
  user_name: string;
  user_phone: string;
  user_email: string;
  order_id: number;
  invoice_code: string;
  status: string;
  total_amount: string;
  order_placed_date: string;
  products: TOrderProductInfo[];
}

export interface TOrderProductInfo {
  product_id: number;
  name: string;
  slug: string;
  image: string;
}

export interface TUserInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string | null;
}
