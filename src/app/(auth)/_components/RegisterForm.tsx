"use client";

import { useState } from "react";
import { CircuitBoard, LogIn, User, Phone, MapPin, Mail } from "lucide-react";
import Link from "next/link";

// A simple form component for registration
const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Credentials:", {
      fullName,
      email,
      phone,
      address,
    });
    // API call for registration logic would go here
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#000f7c] focus:border-[#000f7c] outline-none transition-all duration-300 text-gray-800"
          />
        </div>

        <div className="relative">
          <Mail className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#000f7c] focus:border-[#000f7c] outline-none transition-all duration-300 text-gray-800"
          />
        </div>

        <div className="relative">
          <Phone className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#000f7c] focus:border-[#000f7c] outline-none transition-all duration-300 text-gray-800"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#000f7c] focus:border-[#000f7c] outline-none transition-all duration-300 text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#000f7c] hover:bg-[#000a5a] text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <LogIn className="w-5 h-5 mr-2" />
          Sign Up
        </button>
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
