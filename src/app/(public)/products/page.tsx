import Filter from "@/components/shared/Filter";
import AllProducts from "./_components/AllProducts";
import { Suspense } from "react";
import CardLoading from "@/components/helper/card/CardLoading";

const FallbackCard = Array.from({ length: 6 }).map((_, i) => (
  <CardLoading key={i} />
));

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    min_price?: string;
    max_price?: string;
    page?: string;
    limit?: string;
    category?: string;
  }>;
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

  return (
    <div className="section-gap py-20 grid grid-cols-10 gap-10">
      <div className="col-span-2">
        <Filter />
      </div>
      <div className="col-span-8">
        <Suspense
          fallback={
            <div className="grid grid-cols-3 gap-10 py-10">{FallbackCard}</div>
          }
        >
          <AllProducts queryParams={queryParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
