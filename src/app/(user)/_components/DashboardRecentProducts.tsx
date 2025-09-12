import ProductsCard from "@/components/helper/card/ProductsCard";
import { callAPI } from "@/services";
import { ProductCard, Response } from "@/types/product.type";

const DashboardRecentProducts = async () => {
  const response = (await callAPI("/products/new?limit=4", "GET")) as Response<
    ProductCard[]
  >;
  return <ProductsCard products={response} />;
};

export default DashboardRecentProducts;
