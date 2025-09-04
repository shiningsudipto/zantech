"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { CircleMinus, CirclePlus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Cart = () => {
  const {
    products,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    totalPrice,
  } = useCartStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping cart</SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          {products?.map((product) => {
            return (
              <div key={product?.id} className="flex gap-4">
                <div>
                  <Image
                    src="/demo.jpg"
                    alt={product?.name}
                    width={90}
                    height={90}
                  />
                </div>
                <div>
                  <Link href={`/products/${product?.slug}-${product?.id}`}>
                    {product?.name.slice(0, 28)}...
                  </Link>
                  <div className="flex items-center gap-4">
                    <p className="flex items-center gap-1 font-medium">
                      Price: {product?.price} <FaBangladeshiTakaSign />
                    </p>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => decrementQuantity(product?.id)}>
                        <CircleMinus size={16} />
                      </button>
                      <p>{product?.quantity}</p>
                      <button onClick={() => incrementQuantity(product?.id)}>
                        <CirclePlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <SheetFooter className="border-t">
          <div className="flex justify-between items-center mb-2 font-bold">
            <p className="">Total</p>
            <p className="flex items-center gap-1">
              {totalPrice} <FaBangladeshiTakaSign />{" "}
            </p>
          </div>
          <Button type="button" variant="primary">
            Checkout
          </Button>
          <Button
            onClick={() => clearCart()}
            type="submit"
            variant="secondaryOutline"
          >
            Clear Cart
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
