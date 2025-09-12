import { Suspense } from "react";
import TableSkeleton from "../../_components/loading/TableSkeleton";
import Orders from "../../_components/Orders";

const page = async () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <Orders />
      </Suspense>
    </div>
  );
};

export default page;
