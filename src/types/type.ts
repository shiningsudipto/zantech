export interface TWishlist {
  product_id: number;
  name: string;
  slug: string;
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
