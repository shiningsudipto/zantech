"use client";

import { ProductCard } from "@/types/product.type";
import { Heart } from "lucide-react";
import { AxiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner"; // or your toast lib
import { useState } from "react";

const AddToWishlist = ({ product }: { product: ProductCard }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async () => {
    try {
      setLoading(true);

      const payload = {
        user_id: 3, // TODO
        product_id: product.id,
      };

      const res = await AxiosInstance.post("/wishlist", payload);
      console.log(res);

      if (res?.status === 200 || res?.status === 201) {
        toast.success("Added to wishlist ❤️");
      } else {
        toast.error("Failed to add product to wishlist");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("❌ Wishlist error:", error?.message || error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAddToWishlist} disabled={loading}>
      <Heart className={loading ? "animate-pulse" : ""} />
    </button>
  );
};

export default AddToWishlist;
