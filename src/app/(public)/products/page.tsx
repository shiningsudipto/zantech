import ProductsCard from "@/components/helper/card/ProductsCard";
import Filter from "@/components/shared/Filter";
import LoadProduct from "@/components/shared/LoadProduct";
import { AxiosInstance } from "@/lib/axiosInstance";
import { ProductCard, Response } from "@/types/product.type";

const page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams(Object.entries(resolvedParams));
  const queryParams = {
    search: params.get("search") || "",
    min_price: params.get("min_price") || "",
    max_price: params.get("max_price") || "",
    page: params.get("page") || "1",
    limit: params.get("limit") || "10",
    category: params.get("category") || "",
  };

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
    <div className="section-gap py-20 grid grid-cols-10 gap-5">
      <div className="col-span-2">
        <Filter />
      </div>
      <div className="col-span-8 flex flex-col justify-between">
        {errorMessage ? (
          <div className="text-red-500 text-center py-10">{errorMessage}</div>
        ) : data && data.data?.length > 0 ? (
          <ProductsCard products={data} inRow={3} />
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
    </div>
  );
};

export default page;
