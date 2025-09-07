"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // console.log("search", searchParams.toString());

  const [query, setQuery] = useState("");

  const handleSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchParam("search", query);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Suspense fallback={null}>
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="rounded-full h-11 border ps-4 pe-10 min-w-[350px]"
          placeholder="Query here..."
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>
    </Suspense>
  );
};

export default SearchBar;
