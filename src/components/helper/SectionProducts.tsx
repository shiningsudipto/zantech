import { AxiosInstance } from "@/lib/axiosInstance";
import SectionTitle from "./SectionTitle";
import ProductsCard from "./card/ProductsCard";

const SectionProducts = async ({
  title,
  categoryId,
}: {
  title: string;
  categoryId: number;
}) => {
  const res = await AxiosInstance.get(`/products/category/${categoryId}`);
  const products = res?.data;
  console.log(products);

  return (
    <div>
      <SectionTitle title={title} />
      <ProductsCard products={products} />
    </div>
  );
};

export default SectionProducts;
