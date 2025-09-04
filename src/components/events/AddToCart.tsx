"use client";
import { useCartStore } from "@/stores/cartStore";
import { ProductCard } from "@/types/product.type";

const AddToCart = ({ product }: { product: ProductCard }) => {
  const { addProduct } = useCartStore();
  return (
    <button
      onClick={() => addProduct(product)}
      className="text-center w-[50%] bg-primary text-white p-2 rounded-s-md cursor-pointer hover:bg-blue-950"
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
