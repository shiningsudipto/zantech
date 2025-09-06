import ProductsCard from "@/components/helper/card/ProductsCard";
import LoadProduct from "@/components/shared/LoadProduct";
import { AxiosInstance } from "@/lib/axiosInstance";
import { ProductCard, Response } from "@/types/product.type";

const AllProducts = async ({
  queryParams,
}: {
  queryParams: Record<string, string>;
}) => {
  let data: Response<ProductCard[]> | null = null;
  let errorMessage: string | null = null;

  try {
    const res = await AxiosInstance.get(`/products`, {
      params: queryParams,
    });
    data = res?.data as Response<ProductCard[]>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Error fetching products:", error?.message || error);
    errorMessage = "Failed to load products. Please try again later.";
  }
  return (
    <div>
      {errorMessage ? (
        <div className="text-red-500 text-center py-10">{errorMessage}</div>
      ) : data && data.data?.length > 0 ? (
        <ProductsCard products={data} className="grid-cols-3" />
      ) : (
        <div className="text-gray-500 text-center py-10">
          No products found.
        </div>
      )}
      <div>
        {!errorMessage && (
          <LoadProduct productsLength={data?.data?.length as number} />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
