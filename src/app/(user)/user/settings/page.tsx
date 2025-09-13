import { Suspense } from "react";
import UserInfo from "../../_components/UserInfo";

const page = async () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <Suspense>
        <UserInfo />
      </Suspense>
    </div>
  );
};

export default page;
