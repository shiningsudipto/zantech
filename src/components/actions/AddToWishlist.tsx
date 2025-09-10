"use client";

import { ProductCard, TError } from "@/types/product.type";
import { Heart, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { callAPI } from "@/services";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

const AddToWishlist = ({ product }: { product: ProductCard }) => {
  const { user } = useAuthStore();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleAddToWishlist = async () => {
    if (!user) {
      return toast.info("You need to Login first!");
    }
    setLoading(true);
    const payload = {
      user_id: user?.id,
      product_id: product.id,
    };
    try {
      const result = await callAPI("/wishlist", "POST", payload);
      toast.success(result.message);
      setLoading(false);
    } catch (err) {
      const error = err as TError;
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAddToWishlist} disabled={isLoading}>
      {isLoading ? <Loader2Icon className="animate-spin" /> : <Heart />}
    </button>
  );
};

export default AddToWishlist;
