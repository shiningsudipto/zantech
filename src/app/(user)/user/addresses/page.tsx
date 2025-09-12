import { Suspense } from "react";
import CreateAddress from "../../_components/CreateAddress";
import AddressSection from "../../_components/AddressSection";
import { Skeleton } from "@/components/ui/skeleton";

const fallbackAddressCards = (
  <div>
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-100 rounded-md space-y-5 p-5"
        >
          <Skeleton className="h-5 rounded-md w-1/2" />
          <Skeleton className="h-5 rounded-md w-2/3" />
          <Skeleton className="h-5 rounded-md w-full" />
          <Skeleton className="h-5 rounded-md w-1/4" />
          <Skeleton className="h-5 rounded-md w-1/5" />
        </div>
      ))}
    </div>
  </div>
);

const page = async () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Addresses</h1>
        <CreateAddress />
      </div>
      <Suspense fallback={fallbackAddressCards}>
        <AddressSection />
      </Suspense>
    </div>
  );
};

export default page;
