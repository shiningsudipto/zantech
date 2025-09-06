"use client";

import { useEffect, useState } from "react";
import { Slider } from "../ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";

const productStatus = [
  {
    label: "On sale",
    value: "onsale",
  },
  {
    label: "In stock",
    value: "instock",
  },
];

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState([0, 90]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // const handleSort = (key: string, value: string) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set(key, value);
  //   router.push(`?${params.toString()}`);
  // };

  // update query params when price slider changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("min_price", value[0].toString());
    params.set("max_price", (value[1] * 250).toString());
    router.push(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="">
      <div className="space-y-2">
        <p className="text-lg font-bold">Filter by Price</p>
        <div className="flex items-center justify-between gap-2 font-semibold">
          <p>{value[0]}</p>
          <p>{value[1] * 250}</p>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          aria-label="Dual range slider with output"
        />
      </div>
      <div className="border-t mt-10"></div>
      <div className="flex flex-col gap-y-4 mt-7">
        <p className="text-lg font-bold">Stock Status</p>
        {productStatus.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <Checkbox
              id={item.value}
              checked={selectedStatus.includes(item.value)}
              onCheckedChange={() => toggleStatus(item.value)}
            />
            <Label htmlFor={item.value}>{item.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
