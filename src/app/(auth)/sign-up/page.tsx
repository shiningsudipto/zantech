import { PackageCheck, Zap, Heart } from "lucide-react";
import RegisterForm from "../_components/RegisterForm";
import Link from "next/link";
import Image from "next/image";
const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl grid lg:grid-cols-2 overflow-hidden">
          {/* Left Side: Informative Content */}
          <div className="p-8 md:p-12 bg-white/30 hidden lg:block">
            <Link href="/" className="uppercase">
              <Image
                src="/zantech-logo.png"
                alt="zantech-logo"
                width={200}
                height={100}
                priority
                className="mb-4"
              />
            </Link>
            <h1 className="text-4xl font-bold tracking-tighter mb-4 text-[#000f7c]">
              Join a Universe of Innovation.
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Sign up today and become a part of our community. Get instant
              access to our entire catalog of robotics components, expert
              support, and exclusive deals.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="p-2 bg-[#000f7c]/10 rounded-full mr-4">
                  <PackageCheck className="w-5 h-5 text-[#000f7c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Seamless Order Management
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Keep track of all your past and present orders in one place.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="p-2 bg-[#000f7c]/10 rounded-full mr-4">
                  <Zap className="w-5 h-5 text-[#000f7c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Priority Access to New Products
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Be the first to know about new arrivals and limited-edition
                    components.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="p-2 bg-[#000f7c]/10 rounded-full mr-4">
                  <Heart className="w-5 h-5 text-[#000f7c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Personalized Recommendations
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Receive suggestions tailored to your projects and interests.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Side: Register Form */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default page;
