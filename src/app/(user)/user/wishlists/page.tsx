import { Suspense } from "react";
import WishlistSection from "../../_components/WishlistSection";
import CardLoading from "@/components/helper/card/CardLoading";

const FallbackCard = (
  <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 my-10">
    {Array.from({ length: 4 }).map((_, i) => (
      <CardLoading key={i} />
    ))}
  </div>
);

const page = async () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      <Suspense fallback={FallbackCard}>
        <WishlistSection />
      </Suspense>
    </div>
  );
};

export default page;
