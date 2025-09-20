"use client";
import { useCartStore } from "@/stores/cartStore";
import { ProductCard } from "@/types/product.type";
import { useRouter } from "next/navigation";

const BuyNow = ({ product }: { product: ProductCard }) => {
  const router = useRouter();
  const { addProduct } = useCartStore();
  const handleBuyNow = () => {
    addProduct(product);
    router.push("/checkout");
  };
  return (
    <button
      onClick={handleBuyNow}
      className="text-center w-[50%] bg-secondary text-white p-2 rounded-e-md cursor-pointer hover:bg-red-700"
    >
      Buy Now
    </button>
  );
};

export default BuyNow;
