/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";

const CheckoutPage = () => {
  const { products } = useCartStore();
  const { user } = useAuthStore();

  const [checkoutMethod, setCheckoutMethod] = useState("bKash");
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // [Inference] This is a placeholder for a real API call.
  const handleApplyCoupon = () => {
    // In a real application, you would validate the coupon code against a database.
    if (couponCode.toLowerCase() === "save10") {
      setIsCouponApplied(true);
      setCouponDiscount(0.1); // 10% discount
      alert("Coupon applied successfully!");
    } else {
      setIsCouponApplied(false);
      setCouponDiscount(0);
      alert("Invalid coupon code.");
    }
  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const discountAmount = subtotal * couponDiscount;
  const shippingFee = 60; // Example static shipping fee for Bangladesh
  const total = subtotal - discountAmount + shippingFee;

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Checkout
      </h1>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Side: User Info & Form */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:flex-1">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Shipping Information
          </h2>

          {user ? <div></div> : <div></div>}

          {/* Checkout Method */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Payment Method
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bKash"
                  checked={checkoutMethod === "bKash"}
                  onChange={() => setCheckoutMethod("bKash")}
                  className="form-radio text-indigo-600"
                />
                <Image
                  src="https://zantechbackend.desklago.com/public/images/bkash-logo.svg"
                  alt="bKash"
                  width={50}
                  height={50}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Pay with bKash
                </span>
              </label>
              <label className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={checkoutMethod === "cash"}
                  onChange={() => setCheckoutMethod("cash")}
                  className="form-radio text-indigo-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  Cash on Delivery
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary & Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:flex-1">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Order Summary
          </h2>
          <div className="space-y-4">
            {products.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <Image
                    src={product.image_path || "/demo.jpg"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-md font-medium text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    ৳{(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Apply Coupon
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 hover:bg-indigo-700 disabled:bg-gray-400"
                disabled={isCouponApplied}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="mt-8 border-t pt-4 space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>৳{shippingFee.toFixed(2)}</span>
            </div>
            {isCouponApplied && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount</span>
                <span>- ৳{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>Total</span>
              <span>৳{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-6 py-3 bg-indigo-600 text-white font-bold rounded-lg transition-colors duration-200 hover:bg-indigo-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
