import { callAPI } from "@/services";
import { Response } from "@/types/product.type";
import { TAddress } from "@/types/type";
import Addresses from "./Addresses";
const AddressSection = async () => {
  const response = (await callAPI("/shipping-addresses", "GET")) as Response<
    TAddress[]
  >;
  return <Addresses data={response?.data} />;
};

export default AddressSection;
