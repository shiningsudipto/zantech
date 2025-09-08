"use client";

import { CircuitBoard, Mail, Lock, LogIn, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TUser, useAuthStore } from "@/stores/authStore";
import { usePostQuery } from "@/hooks/usePost";
import { Response } from "@/types/product.type";
import { TUserRes } from "@/types/auth.type";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const { mutate: LoginFN, isPending } = usePostQuery<
    Response<TUserRes>,
    { email: string; password: string }
  >("/users/login", {
    onSuccess: (res) => {
      const user: TUser = {
        id: res?.data?.id,
        role: res?.data?.type,
        name: res?.data?.name,
        phone: res?.data?.phone,
        email: res?.data?.email,
      };
      setUser(user, res?.data?.token);
      toast.success(res?.message);

      router.push("/");
    },
  });

  console.log({ isPending });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    LoginFN(payload);
  };

  return (
    <div className="p-8 md:p-12 bg-white text-gray-800">
      {/* Header for Mobile */}
      <div className="text-center mb-8 lg:hidden">
        <Link
          href="/"
          className="flex items-center justify-center space-x-2 text-gray-800 mb-4"
        >
          <CircuitBoard className="h-8 w-8 text-[#000f7c]" />
          <span className="text-3xl font-bold">Zantech</span>
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
      <p className="text-gray-600 text-center mb-8">
        Enter your credentials to continue.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#000f7c] focus:border-[#000f7c] outline-none transition-all duration-300 text-gray-800"
          />
        </div>

        <div className="relative">
          <Lock className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#000f7c] focus:border-[#000f7c] outline-none transition-all duration-300 text-gray-800"
          />
        </div>

        <div className="text-right">
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-[#000f7c] transition-colors"
          >
            Forgot Password?
          </a>
        </div>

        <Button
          disabled={isPending}
          variant={"primary"}
          size={"xl"}
          width={"full"}
          type="submit"
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <LogIn size={18} className="mr-2" />
          )}
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-8">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-[#000f7c] hover:text-[#000a5a]"
        >
          Create One
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
