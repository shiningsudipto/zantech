import GlowCard from "@/components/ui/spotlight-card";
import { callAPI } from "@/services";
import { Response } from "@/types/product.type";
import { TUserInfo } from "@/types/type";
import UpdateUserInfo from "./UpdateUserInfo";
const UserInfo = async () => {
  const response = (await callAPI("/users/info", "GET")) as Response<TUserInfo>;
  return (
    <div className="flex h-full items-center justify-center">
      <GlowCard className="relative h-fit w-fit shadow-none bg-white p-5 min-w-[450px]">
        <h2 className="text-3xl font-bold text-center h-fit">
          User Information
        </h2>
        <UpdateUserInfo info={response?.data} />
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-lg font-semibold">{response?.data?.name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg font-semibold">{response?.data?.email}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="text-lg font-semibold">{response?.data?.phone}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Address</p>
            <p className="text-lg font-semibold">
              {response?.data?.address || "N/A"}
            </p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

export default UserInfo;
