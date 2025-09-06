"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const LoadProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [limit, setLimit] = useState(10); // initial limit
  const page = 1; // static page

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    router.push(`?${params.toString()}`);
  }, [limit, page, router, searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setLimit((prev) => prev + 10); // just update state here
        }
      },
      { threshold: 1.0 } // fully visible
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={loaderRef} className="py-6 flex justify-center">
      <p className="text-gray-600 flex items-center gap-2 text-lg text-center border px-4 py-2 rounded-2xl">
        <Loader2Icon className="animate-spin" /> Loading more products...
      </p>
    </div>
  );
};

export default LoadProduct;
