import { callAPI } from "@/services";
import { Response } from "@/types/product.type";
import { TAddress } from "@/types/type";
import Addresses from "../../_components/Addresses";
import { Suspense } from "react";
import CreateAddress from "../../_components/CreateAddress";

const page = async () => {
  const response = (await callAPI("/shipping-addresses", "GET")) as Response<
    TAddress[]
  >;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Addresses</h1>
        <CreateAddress />
      </div>
      <Suspense>
        <Addresses data={response?.data} />
      </Suspense>
    </div>
  );
};

export default page;
