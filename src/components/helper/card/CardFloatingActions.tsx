"use client";
import { Heart, Search, Shuffle } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const actions = [
  {
    id: "compare",
    icon: <Shuffle />,
    tooltip: "Compare",
  },
  {
    id: "quick-view",
    icon: <Search />,
    tooltip: "Quick View",
  },
  {
    id: "wishlist",
    icon: <Heart />,
    tooltip: "Add to Wishlist",
  },
];
const CardFloatingActions = () => {
  return (
    <div
      className="
              floating-actions absolute top-[40%] right-0 
              flex flex-col bg-white p-1 rounded-md shadow-md
              translate-x-full opacity-0 
              transition-all duration-300 ease-in-out
              group-hover:translate-x-0 group-hover:opacity-100
            "
    >
      {actions.map((action, index) => (
        <Tooltip key={action.id}>
          <TooltipTrigger asChild>
            <button
              className={`
            hover:bg-secondary cursor-pointer bg-primary text-white p-1 hover:text-white 
            ${index === 0 ? "rounded-t" : ""}
            ${index === actions.length - 1 ? "rounded-b" : ""}
          `}
              onClick={() => console.log(`${action.tooltip} clicked`)}
            >
              {action.icon}
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{action.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default CardFloatingActions;
