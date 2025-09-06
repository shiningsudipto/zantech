"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const LoadProduct = ({ productsLength }: { productsLength: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [limit, setLimit] = useState(productsLength || 10); // start from actual productsLength
  const page = 1; // static page

  // 🔄 keep limit in sync with productsLength
  useEffect(() => {
    if (productsLength > 0) {
      setLimit(productsLength);
    }
  }, [productsLength]);

  // push params when limit changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  }, [limit, page, router, searchParams]);

  // infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          // only increase limit if last fetch filled it (more data available)
          if (productsLength >= limit) {
            setLimit((prev) => prev + 10);
          }
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [productsLength, limit]);

  return (
    <div ref={loaderRef} className="py-6 flex justify-center">
      <p className="text-gray-600 flex items-center gap-2 text-lg text-center border px-4 py-2 rounded-2xl">
        <Loader2Icon className="animate-spin" /> Loading more products...
      </p>
    </div>
  );
};

export default LoadProduct;
