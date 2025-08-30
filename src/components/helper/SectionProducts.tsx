import { ProductCard } from "@/types/product.type";
import SectionTitle from "./SectionTitle";
import Image from "next/image";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { BadgePercent, Heart, Search, Shuffle } from "lucide-react";

const SectionProducts = async () => {
  const data = await fetch(
    "https://zantechbackend.desklago.com/api/products/category/5"
  );
  const products = await data.json();
  console.log(products);
  return (
    <div>
      <SectionTitle title="complete package" />
      <div className="grid grid-cols-4 gap-10 my-10">
        {products?.data?.map((product: ProductCard) => {
          return (
            <div
              key={product?.id}
              className="group relative p-4 shadow-md rounded-md flex flex-col justify-between"
            >
              <div className="relative">
                <Image
                  src={"/demo.jpg"}
                  alt={product?.name}
                  height={300}
                  width={300}
                  className="rounded-md aspect-square object-cover w-full"
                />

                {product?.discount > 0 && (
                  <p className="flex items-center text-base absolute top-0 right-0 m-1 bg-secondary text-white rounded-full py-1.5 px-1">
                    {product?.discount} <BadgePercent size={18} />
                  </p>
                )}

                {/* Floating actions */}
                <div
                  className="
              floating-actions absolute top-[40%] right-0 
              flex flex-col bg-white p-1 rounded-md shadow-md
              translate-x-full opacity-0 
              transition-all duration-300 ease-in-out
              group-hover:translate-x-0 group-hover:opacity-100
            "
                >
                  <button className="hover:bg-secondary cursor-pointer bg-primary text-white p-1 hover:text-white rounded-t">
                    <Shuffle />{" "}
                  </button>
                  <button className="hover:bg-secondary cursor-pointer bg-primary text-white p-1 hover:text-white">
                    <Search />{" "}
                  </button>
                  <button className="hover:bg-secondary cursor-pointer bg-primary text-white p-1 hover:text-white rounded-b">
                    <Heart />{" "}
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-medium mt-3">{product?.name}</h3>

              <p className="flex items-center text-primary gap-2">
                From{" "}
                <strong className="flex items-center ">
                  <FaBangladeshiTakaSign />
                  {product?.price}
                </strong>
              </p>

              <div className="flex items-center border-t pt-2 mt-2 font-bold">
                <button className="text-center w-[50%] bg-primary text-white p-2 rounded-s-md cursor-pointer hover:bg-blue-950">
                  Add to Cart
                </button>
                <button className="text-center w-[50%] bg-secondary text-white p-2 rounded-e-md cursor-pointer hover:bg-red-700">
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionProducts;
