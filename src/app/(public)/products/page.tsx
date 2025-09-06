import Filter from "@/components/shared/Filter";
import LoadProduct from "@/components/shared/LoadProduct";

const page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams(Object.entries(resolvedParams));
  const queryParams = {
    searchTerm: params.get("search") || "",
    min_price: params.get("min_price") || "",
    max_price: params.get("max_price") || "",
    page: params.get("page") || "",
    limit: params.get("limit") || "",
  };
  console.log(queryParams);
  return (
    <div className="section-gap py-20 grid grid-cols-10 gap-5">
      <div className="col-span-2">
        <Filter />
      </div>
      <div className="col-span-8 border flex flex-col justify-between">
        <p>Product</p>
        <div>
          <LoadProduct />
        </div>
      </div>
    </div>
  );
};

export default page;
