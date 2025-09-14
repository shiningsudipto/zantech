import { Suspense } from "react";
import UserInfo from "../../_components/UserInfo";
import { Skeleton } from "@/components/ui/skeleton";

const fallbackUserInfo = (
  <div className="border p-5 rounded-md space-y-4 max-w-[450px] mx-auto">
    <div className="flex justify-center">
      <Skeleton className="h-5 rounded-md w-1/2" />
    </div>
    <Skeleton className="h-4 rounded-md w-28" />
    <Skeleton className="h-5 rounded-md" />
    <Skeleton className="h-4 rounded-md w-28" />
    <Skeleton className="h-5 rounded-md" />
    <Skeleton className="h-4 rounded-md w-28" />
    <Skeleton className="h-5 rounded-md" />
    <Skeleton className="h-4 rounded-md w-28" />
    <Skeleton className="h-5 rounded-md" />
  </div>
);

const page = async () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <Suspense fallback={fallbackUserInfo}>
        <UserInfo />
      </Suspense>
    </div>
  );
};

export default page;
