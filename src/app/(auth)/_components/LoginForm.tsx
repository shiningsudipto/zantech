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
import { useForm } from "react-hook-form";
import Input from "@/components/form/Input";

import Cookies from "js-cookie";

type TLoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const { mutate: LoginFN, isPending } = usePostQuery<
    Response<TUserRes>,
    TLoginFormValues
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

      Cookies.set("tokenZan", res?.data?.token, {
        expires: 7, // 7 days
        secure: true, // only send over HTTPS
        sameSite: "strict",
      });

      toast.success(res?.message);

      router.push("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>();

  const onSubmit = (data: TLoginFormValues) => {
    LoginFN(data);
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          type="email"
          placeholder="Email Address"
          icon={Mail}
          register={register("email", { required: "Email is required" })}
          error={errors.email}
        />

        {/* Password */}
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          icon={Lock}
          register={register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters required" },
          })}
          error={errors.password}
        />

        <div className="text-right">
          <Link
            href="/reset-password"
            className="text-sm text-gray-600 hover:text-[#000f7c] transition-colors"
          >
            Forgot Password?
          </Link>
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
