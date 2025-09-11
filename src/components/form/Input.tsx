"use client";

import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { LucideIcon } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: FieldError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: ReturnType<any>;
}

const Input = ({
  label,
  icon: Icon,
  error,
  register,
  ...rest
}: InputFieldProps) => {
  return (
    <div className="relative space-y-2">
      {label && (
        <p>
          <label htmlFor={label}>{label}</label>
        </p>
      )}
      {Icon && (
        <Icon
          className={`absolute ${
            label ? "top-12.5" : "top-6.5"
          } left-4 -translate-y-1/2 w-5 h-5 text-gray-500`}
        />
      )}
      <input
        id={label}
        {...register}
        {...rest}
        className={`w-full bg-gray-100 border rounded-lg py-3 ${
          Icon ? "pl-12 pr-4" : "px-4"
        } outline-none transition-all duration-300 text-gray-800 
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-[#000f7c] focus:border-[#000f7c]"
          }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
