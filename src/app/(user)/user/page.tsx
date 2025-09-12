import { Suspense } from "react";
import DashboardStats from "../_components/DashboardStats";
import SectionTitle from "@/components/helper/SectionTitle";
import DashboardRecentProducts from "../_components/DashboardRecentProducts";
import CardLoading from "@/components/helper/card/CardLoading";
import { Skeleton } from "@/components/ui/skeleton";

const FallbackCard = (
  <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 my-10">
    {Array.from({ length: 4 }).map((_, i) => (
      <CardLoading key={i} />
    ))}
  </div>
);

const FallbackStats = (
  <div className="grid grid-cols-4 gap-5">
    <Skeleton className="min-h-[150px] w-full rounded-xl" />
    <Skeleton className="min-h-[150px] w-full rounded-xl" />
    <Skeleton className="min-h-[150px] w-full rounded-xl" />
    <Skeleton className="min-h-[150px] w-full rounded-xl" />
  </div>
);

const Page = async () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Suspense fallback={FallbackStats}>
        <DashboardStats />
      </Suspense>
      <div className="mt-12 space-y-6">
        <SectionTitle title="Recently Added Products" />
        <Suspense fallback={FallbackCard}>
          <DashboardRecentProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
