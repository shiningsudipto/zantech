"use client";
import { Calendar, Heart, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/user",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/user/orders",
    icon: Inbox,
  },
  {
    title: "Wishlists",
    url: "/user/wishlists",
    icon: Heart,
  },
  {
    title: "Downloads",
    url: "/user/downloads",
    icon: Calendar,
  },
  {
    title: "Addresses",
    url: "/user/addresses",
    icon: Search,
  },
  {
    title: "Account Details",
    url: "/user/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const { user } = useAuthStore();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" className="text-white">
      <SidebarContent className="bg-primary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white p-4 mb-4 mt-2 border border-blue-300">
            <div className="text-center w-full">
              <h2 className="text-xl">{user?.name}</h2>
              <p className="text-sm">{user?.email}</p>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item?.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="flex items-center justify-center"
                  >
                    <SidebarMenuButton asChild className="">
                      <Link
                        href={item.url}
                        className={`${
                          isActive && "bg-secondary flex justify-center"
                        }`}
                      >
                        <item.icon className={`${isActive && "ms-2.5"}`} />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-primary">
        {state === "collapsed" ? (
          <span className="text-sm font-bold">Z</span>
        ) : (
          <span className="text-sm font-bold">Zantech</span>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
