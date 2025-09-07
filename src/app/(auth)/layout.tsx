import { Providers } from "@/lib/Provider";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Providers>{children}</Providers>
    </main>
  );
};

export default layout;
