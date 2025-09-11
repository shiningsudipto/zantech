import { callAPI } from "@/services";
import { Response } from "@/types/product.type";
import { TAddress } from "@/types/type";
import Addresses from "../../_components/Addresses";
import { Suspense } from "react";

const page = async () => {
  const response = (await callAPI("/shipping-addresses", "GET")) as Response<
    TAddress[]
  >;
  console.log(response);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Suspense>
        <Addresses data={response?.data} />
      </Suspense>
    </div>
  );
};

export default page;
