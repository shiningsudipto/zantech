import { callAPI } from "@/services";
import { TOrder } from "@/types/order.type";
import { Response } from "@/types/product.type";

const page = async () => {
  const response = (await callAPI("/orders", "GET")) as Response<TOrder[]>;

  return (
    <div>
      <p>Hello, page!</p>
    </div>
  );
};

export default page;
