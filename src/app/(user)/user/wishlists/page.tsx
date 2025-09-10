"use client";
import { useAuthStore } from "@/stores/authStore";
import WishLists from "../../_components/WishLists";

const page = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuthStore();

  return (
    <div>
      <WishLists id={user?.id as number} />
    </div>
  );
};

export default page;
