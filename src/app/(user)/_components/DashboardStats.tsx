import { callAPI } from "@/services";
import { Response } from "@/types/product.type";
import { TStats } from "@/types/type";
import { ShoppingBag, Heart, MapPin, DollarSign } from "lucide-react";
const DashboardStats = async () => {
  const response = (await callAPI(
    "/users/dashboard",
    "GET"
  )) as Response<TStats>;
  const stats = response?.data;

  if (!stats) {
    return (
      <div className="p-6">
        <p className="text-gray-600">No stats available.</p>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Orders",
      value: stats.total_orders,
      icon: <ShoppingBag className="w-6 h-6 text-[#08C3A1]" />,
      color: "bg-[#08C3A1]",
    },
    {
      title: "Wishlists",
      value: stats.total_wishlists,
      icon: <Heart className="w-6 h-6 text-[#6B69E3]" />,
      color: "bg-[#6B69E3]",
    },
    {
      title: "Addresses",
      value: stats.total_addresses,
      icon: <MapPin className="w-6 h-6 text-[#F9A91D]" />,
      color: "bg-[#F9A91D]",
    },
    {
      title: "Total Spent",
      value: `$${stats.total_spent}`,
      icon: <DollarSign className="w-6 h-6 text-[#FE4A61]" />,
      color: "bg-[#FE4A61]",
    },
  ];
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`flex items-center p-6 rounded-2xl shadow-md border border-gray-200 text-white transform transition-transform duration-300 hover:scale-105 ${card.color}`}
        >
          <div className="p-3 rounded-full bg-white shadow mr-4">
            {card.icon}
          </div>
          <div className="space-y-5">
            <p className="text-2xl font-medium">{card.title}</p>
            <p className="text-4xl font-bold">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
