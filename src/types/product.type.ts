export interface ProductCard {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  status: string;
  quantity: number;
  price: number;
  discount: number;
  image_path: string;
}

export interface Response<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
}

export interface ProductDetails {
  id: number;
  slug: string;
  name: string;
  description: string;
  short_description: string;
  is_bundle: number;
  status: string;
  quantity: number;
  price: number;
  discount: number;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  categories: ProductDetailsCategory[];
  tags: ProductDetailsTag[];
  images: ProductDetailsImage[];
}

export interface ProductDetailsCategory {
  id: number;
  name: string;
}

export interface ProductDetailsTag {
  id: number;
  tag: string;
  slug: string;
}

export interface ProductDetailsImage {
  id: number;
  path: string;
}
