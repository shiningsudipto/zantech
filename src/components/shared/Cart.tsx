import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
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
          {/* <SheetDescription>
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <h2>Yo</h2>
          <h2>Yooo</h2>
        </div>
        <SheetFooter>
          <Button type="button" variant="primary">
            Checkout
          </Button>
          <Button type="submit" variant="secondaryOutline">
            Clear Cart
          </Button>
          {/* <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
