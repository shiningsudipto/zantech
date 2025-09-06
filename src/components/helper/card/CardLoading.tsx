import { Skeleton } from "@/components/ui/skeleton";

const CardLoading = () => {
  return (
    <div className="flex flex-col space-y-3 p-4 shadow-md border border-gray-100 rounded-md">
      <Skeleton className="h-full w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[30%]" />
      </div>
      <div className="border-t pb-1 mt-1 border-gray-100"></div>
      <div className="flex gap-5">
        <Skeleton className="w-[50%] h-10" />
        <Skeleton className="w-[50%] h-10" />
      </div>
    </div>
  );
};

export default CardLoading;
