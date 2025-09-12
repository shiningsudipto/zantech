import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-5">
        <Skeleton className="w-full p-5" />
        <Skeleton className="w-full p-5" />
        <Skeleton className="w-full p-5" />
        <Skeleton className="w-full p-5" />
        <Skeleton className="w-full p-5" />
      </div>
      <Skeleton className="w-full p-5" />
      <Skeleton className="w-full p-5" />
      <Skeleton className="w-full p-5" />
    </div>
  );
};

export default TableSkeleton;
