import { AxiosInstance } from "@/lib/axiosInstance";
import ProductsCard from "./card/ProductsCard";

const LoadSectionProducts = async ({ categoryId }: { categoryId: number }) => {
  const res = await AxiosInstance.get(`/products/category/${categoryId}`);
  const products = res?.data;
  return <ProductsCard products={products} />;
};

export default LoadSectionProducts;
