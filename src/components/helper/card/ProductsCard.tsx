import Image from "next/image";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { BadgePercent } from "lucide-react";
import Link from "next/link";
import { ProductCard, Response } from "@/types/product.type";
import CardFloatingActions from "./CardFloatingActions";
import AddToCart from "@/components/events/AddToCart";

const ProductsCard = ({
  products,
  className,
}: {
  products: Response<ProductCard[]>;
  className?: string;
}) => {
  return (
    <div
      className={`grid gap-10 my-10 ${className ? className : "grid-cols-4"}`}
    >
      {products?.data?.map((product) => {
        return (
          <div
            key={product?.id}
            className="group relative p-4 shadow-md rounded-md flex flex-col justify-between border border-gray-100"
          >
            <div className="relative">
              <Image
                src={"/demo.jpg"}
                alt={product?.name}
                height={300}
                width={300}
                className="rounded-md aspect-square object-cover w-full transform transition-transform duration-500 group-hover:scale-105"
              />

              {product?.discount > 0 && (
                <p className="flex items-center text-base absolute top-0 right-0 m-1 bg-secondary text-white rounded-full py-1.5 px-1">
                  {product?.discount} <BadgePercent size={18} />
                </p>
              )}

              {/* Floating actions */}
              <CardFloatingActions product={product} />
            </div>
            <Link href={`/products/${product?.slug}-${product?.id}`}>
              <h3 className="text-xl font-medium mt-3 hover:text-primary">
                {product?.name}
              </h3>
            </Link>

            <p className="flex items-center text-primary gap-2">
              From{" "}
              <strong className="flex items-center ">
                <FaBangladeshiTakaSign />
                {product?.price}
              </strong>
            </p>

            <div className="flex items-center border-t pt-3.5 mt-2 font-bold">
              <AddToCart product={product} />
              <button className="text-center w-[50%] bg-secondary text-white p-2 rounded-e-md cursor-pointer hover:bg-red-700">
                Buy Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsCard;
