import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <main className="w-full">
        <div className="bg-primary h-10 flex items-center">
          <SidebarTrigger className="text-2xl hover:text-black" />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
