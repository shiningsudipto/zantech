"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { TWishlist } from "@/types/type";
import Link from "next/link";
import { callAPI } from "@/services";
import { toast } from "sonner";
import { TError } from "@/types/product.type";

const WishLists = ({ data }: { data: TWishlist[] }) => {
  const removeFromWishList = async (id: number) => {
    try {
      const response = await callAPI(
        `/wishlist/${id}`,
        "DELETE",
        null,
        "/user/wishlists"
      );
      toast.success(response?.message);
    } catch (err) {
      const error = err as TError;
      toast.error(error?.message);
    }
  };

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-gray-500">No items in your wishlist</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => (
        <div
          key={item.product_id}
          className="group border rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-[1.02] bg-white overflow-hidden"
        >
          <div className="relative w-full h-52">
            <Image
              src={"/demo.jpg"} // TODO
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
            <button
              onClick={() => removeFromWishList(item?.product_id)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-red-50 transition"
            >
              <Heart className="w-5 h-5 text-red-500" fill="#fb2c36" />
            </button>
          </div>
          <div className="p-4 space-y-2">
            <Link href={`/products/${item?.product_slug}`}>
              <h3 className="text-xl font-medium mt-3 hover:text-primary">
                {item?.name}
              </h3>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-green-600">
                ${item.price - item.discount}
              </span>
              {item.discount > 0 && (
                <span className="text-sm line-through text-gray-400">
                  ${item.price}
                </span>
              )}
            </div>
            <button className="text-center w-full rounded-md bg-secondary text-white p-2 cursor-pointer hover:bg-red-700">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishLists;
