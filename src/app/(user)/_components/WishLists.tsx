"use client";
import Image from "next/image";
import { AxiosInstance } from "@/lib/axiosInstance";
import { Response } from "@/types/product.type";
import { TWishlist } from "@/types/type";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

const WishLists = ({ id }: { id: number }) => {
  const [wishlist, setWishlist] = useState<TWishlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await AxiosInstance.get<Response<TWishlist[]>>(
          `/wishlist/${id}`
        );
        setWishlist(response.data.data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-gray-500 animate-pulse">Loading wishlist...</p>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-gray-500">No items in your wishlist</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((item) => (
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
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-red-50 transition">
                <Heart className="w-5 h-5 text-red-500" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.product_slug}</p>
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
              <button className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishLists;
