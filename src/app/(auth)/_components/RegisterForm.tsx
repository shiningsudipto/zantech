"use client";

import {
  CircuitBoard,
  LogIn,
  User,
  Phone,
  MapPin,
  Mail,
  Loader2Icon,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputField from "@/components/form/Input";
import { usePostQuery } from "@/hooks/usePost";
import { Response } from "@/types/product.type";
import { TUserRes } from "@/types/auth.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type TUserRegister = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserRegister>();

  const { mutate: RegisterFN, isPending } = usePostQuery<
    Response<TUserRes>,
    TUserRegister
  >("/users/register", {
    onSuccess: (res) => {
      toast.success(res?.message);
      router.push("/sign-in");
    },
  });

  const onSubmit = (data: TUserRegister) => {
    console.log("Registration Credentials:", data);
    RegisterFN(data);
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

      <h2 className="text-3xl font-bold text-center mb-2">
        Join Our Community
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Create your account to unlock exclusive features.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="Full Name"
          icon={User}
          type="text"
          placeholder="Full Name"
          register={register("name", { required: "Full name is required" })}
          error={errors.name}
        />

        <InputField
          label="Email"
          icon={Mail}
          type="email"
          placeholder="Email Address"
          register={register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
          })}
          error={errors.email}
        />

        <InputField
          label="Phone"
          icon={Phone}
          type="tel"
          placeholder="Phone Number"
          register={register("phone", {
            required: "Phone is required",
            minLength: { value: 11, message: "Phone must be 11 digits" },
            maxLength: { value: 11, message: "Phone must be 11 digits" },
            pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" },
          })}
          error={errors.phone}
        />

        <InputField
          label="Password"
          icon={MapPin}
          type="password"
          placeholder="Password"
          register={register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "At least 8 characters" },
            maxLength: { value: 11, message: "Max 11 characters" },
          })}
          error={errors.password}
        />

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
          Sign Un
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-8">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[#000f7c] hover:text-[#000a5a]"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
