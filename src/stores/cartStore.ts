import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image_path: string | null;
  discount: number;
  quantity: number;
};

type CartState = {
  products: Product[];
  totalProducts: number;
  totalPrice: number;
  addProduct: (product: Omit<Product, "quantity">) => void;
  removeProduct: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      totalProducts: 0,
      totalPrice: 0,

      addProduct: (product) => {
        const { products } = get();
        const existing = products.find((p) => p.id === product.id);
        let updatedProducts;

        if (existing) {
          updatedProducts = products.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
          toast.success("Product quantity updated.");
        } else {
          updatedProducts = [...products, { ...product, quantity: 1 }];
          toast.success("Product added to the cart");
        }

        set(recalculate(updatedProducts));
      },

      removeProduct: (id) => {
        const updatedProducts = get().products.filter((p) => p.id !== id);
        set(recalculate(updatedProducts));
      },

      incrementQuantity: (id) => {
        const updatedProducts = get().products.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        );
        set(recalculate(updatedProducts));
      },

      decrementQuantity: (id) => {
        const updatedProducts = get()
          .products.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity - 1 } : p
          )
          .filter((p) => p.quantity > 0); // auto remove if qty = 0
        set(recalculate(updatedProducts));
      },

      clearCart: () => set({ products: [], totalProducts: 0, totalPrice: 0 }),
    }),
    { name: "cart-storage-zanTech" }
  )
);

// 🔹 Helper function
function recalculate(products: Product[]) {
  const totalProducts = products.reduce((sum, p) => sum + p.quantity, 0);

  const totalPrice = products.reduce((sum, p) => {
    const discounted = p.price - (p.price * p.discount) / 100;
    return sum + discounted * p.quantity;
  }, 0);

  return { products, totalProducts, totalPrice };
}
