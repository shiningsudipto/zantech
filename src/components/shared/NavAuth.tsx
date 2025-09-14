"use client";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { Button } from "../ui/button";
import Cookies from "js-cookie";

const NavAuth = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    Cookies.remove("tokenZan");
    logout();
  };
  return (
    <div className="ms-4">
      {user ? (
        <div className="flex gap-4 items-center">
          <Link
            href="/user"
            className="uppercase px-4 py-2.5 rounded-md hover:bg-gray-100"
          >
            Profile
          </Link>
          <Button
            onClick={handleLogout}
            variant={"secondaryOutline"}
            size={"xl"}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link href="/sign-in" className="primary-btn">
          Login
        </Link>
      )}
    </div>
  );
};

export default NavAuth;
