import { Response } from "@/types/product.type";
import { TWishlist } from "@/types/type";
import { callAPI } from "@/services";
import WishLists from "./WishLists";

const WishlistSection = async () => {
  const response = (await callAPI("/wishlist", "GET")) as Response<TWishlist[]>;
  return <WishLists data={response?.data} />;
};

export default WishlistSection;
