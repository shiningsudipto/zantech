import { Response } from "@/types/product.type";
import WishLists from "../../_components/WishLists";
import { TWishlist } from "@/types/type";
import { callAPI } from "@/services";
import { Suspense } from "react";

const page = async () => {
  const response = (await callAPI("/wishlist", "GET")) as Response<TWishlist[]>;
  console.log(response);
  return (
    <Suspense>
      <WishLists data={response?.data} />
    </Suspense>
  );
};

export default page;
