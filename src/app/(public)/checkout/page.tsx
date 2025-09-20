"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";
import { AxiosInstance } from "@/lib/axiosInstance";
import { TAddress } from "@/types/type";
import { useForm } from "react-hook-form";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { callAPI } from "@/services";
import { handleAsync } from "@/lib/asyncHandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAnonymousStore } from "@/stores/anonymousStore";

type TGuestUserInfo = {
  name: string;
  phone: string;
  address: string;
};

const shippingMethods = [
  {
    title: "Cash on Delivery",
    id: 1,
  },
  {
    title:
      "Local Pickup (Pocket Gate, Road 08, Block C, Bashundhara R/A, Dhaka - 1229)",
    id: 3,
  },
];

const area = [
  {
    title: "Inside Dhaka (70tk)",
    value: true,
  },
  {
    title: "Outside Dhaka (120tk)",
    value: false,
  },
];

function increaseByFifteenPerThousand(amount: number): number {
  const incrementRate = 18 / 1000;
  return amount + amount * incrementRate;
}

const bkashNumberPersonal = "01627199815";

const CheckoutPage = () => {
  const navigate = useRouter();
  const { user } = useAuthStore();
  const { anonymousUser, setUser } = useAnonymousStore();
  const { products, totalPrice, totalProducts, clearCart } = useCartStore();
  const [finalPrice, setFinalPrice] = useState<number>(totalPrice);
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number | null>(null);
  const [shippingAddresses, setShippingAddresses] = useState<TAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number>();
  const [selectedMethodId, setSelectedMethodId] = useState<number>(1);
  const [selectedAdvancePayment, setSelectedAdvancePayment] = useState<
    string | number
  >(3);
  const [insideDhaka, setInsideDhaka] = useState<boolean>(true);
  const [bkashNumber, setBkashNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TGuestUserInfo>({
    defaultValues: {
      name: anonymousUser?.name,
      phone: anonymousUser?.phone,
      address: anonymousUser?.address,
    },
  });

  const onSubmit = async (data: TGuestUserInfo) => {
    setUser(data);
    toast.success("Guest user info updated!");
  };

  const handleOrder = async () => {
    if (user) {
      if (!selectedAddress) {
        return toast.info("You need to select shipping address!");
      }
    }
    if (selectedAdvancePayment === "bkash") {
      if (!bkashNumber || !trxId) {
        return toast.info("You must enter bKash number and Transaction ID.");
      }
    }
    const payload = {
      coupon_id: discount ? 3 : null,
      user_id: user ? user.id : null,
      shipping_id: user ? selectedAddress : null,
      ...(!user && {
        user_name: anonymousUser?.name,
        address: anonymousUser?.address,
        userphone: anonymousUser?.phone,
      }),
      shipping_charge:
        selectedMethodId === 1
          ? insideDhaka
            ? 70
            : 120
          : selectedMethodId === 2 && 0,
      product_subtotal: totalPrice,
      total: finalPrice,
      payment_type: selectedAdvancePayment === "bkash" ? 2 : selectedMethodId,
      ...(selectedAdvancePayment === "bkash" && {
        trxed: trxId,
        paymentphone: bkashNumber,
      }),
      products: products?.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };
    // console.log({ payload });
    const res = await handleAsync(() =>
      callAPI(`/orders/place-order`, "POST", payload, "/user/orders")
    );
    console.log(res);
    if (res?.success) {
      clearCart();
      if (!user) {
        navigate.push("/");
      } else {
        navigate.push("/user/orders");
      }
    }
  };

  const handleCoupon = async () => {
    if (!coupon) {
      toast.error("Please enter a valid coupon code.");
      return;
    }
    const payload = {
      coupon_code: coupon,
      total_amount: totalPrice,
      user_id: user?.id,
    };
    const res = await handleAsync(() =>
      callAPI("/check-coupon", "POST", payload)
    );
    console.log("res:", res);
    if (res?.success) {
      const discountValue = res?.data?.discount ?? 0;
      setDiscount(discountValue);
      setFinalPrice((prevPrice) => prevPrice - discountValue);
    }
  };

  useEffect(() => {
    let newPrice = totalPrice;
    // Shipping charges
    if (selectedMethodId === 1) {
      if (insideDhaka) {
        newPrice = totalPrice + 70;
      } else {
        newPrice = totalPrice + 120;
      }
    }
    // ✅ Advance payment charges
    if (selectedAdvancePayment === "bkash") {
      newPrice = increaseByFifteenPerThousand(newPrice);
      // apply percentage on top of current total (including shipping)
    }
    // Apply discount if available
    if (discount) {
      newPrice -= discount;
    }

    setFinalPrice(newPrice);
  }, [
    selectedMethodId,
    totalPrice,
    insideDhaka,
    discount,
    selectedAdvancePayment,
  ]);

  useEffect(() => {
    if (user) {
      const getAddress = async () => {
        const res = await AxiosInstance.get("/shipping-addresses");
        setShippingAddresses(res?.data?.data);
      };
      getAddress();
    }
  }, [user]);

  useEffect(() => {
    if (anonymousUser) {
      reset(anonymousUser);
    }
  }, [reset, anonymousUser]);

  return (
    <div className="section-gap min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Checkout
      </h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 my-10">
        <div className="w-full">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Shipping Information</h2>
            {user && (
              <Link
                href={"/user/addresses"}
                className="font-bold border py-1 px-2 rounded-md text-primary hover:text-secondary"
              >
                Add or Update Shipping Address
              </Link>
            )}
          </div>
          {user ? (
            <div className="grid grid-cols-2 gap-5">
              {shippingAddresses?.map((item) => (
                <label
                  key={item?.id}
                  className={`p-4 border rounded-md space-y-1 cursor-pointer flex items-start gap-4 ${
                    selectedAddress === item?.id
                      ? "bg-blue-100 border-blue-500"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingAddress"
                    value={item?.id}
                    checked={selectedAddress === item?.id}
                    onChange={() => setSelectedAddress(item?.id)}
                    className="mt-1 accent-blue-600"
                  />
                  <div>
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {item?.f_name} {item?.l_name}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {item?.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {item?.address}
                    </p>
                    <p>
                      <span className="font-semibold">City:</span> {item?.city}
                    </p>
                    <p>
                      <span className="font-semibold">Zip:</span> {item?.zip}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-lg mb-4">
                You have&apos;nt sign in yet, order as{" "}
                <span className="font-semibold">Guest user</span> or{" "}
                <Link
                  href={"/sign-in"}
                  className="text-primary underline font-bold"
                >
                  click here to Sign-in
                </Link>{" "}
              </p>
              <p className="text-xl font-semibold mb-3">Guest User</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Name"
                  type="text"
                  placeholder="John Doe!"
                  register={register("name", {
                    required: "Name is required",
                  })}
                  error={errors.name}
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="01700000000"
                  register={register("phone", {
                    required: "Phone is required",
                    minLength: {
                      value: 11,
                      message: "Phone must be 11 digits",
                    },
                    maxLength: {
                      value: 11,
                      message: "Phone must be 11 digits",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                  error={errors.phone}
                />
                <Input
                  label="Address"
                  type="text"
                  placeholder="Full address"
                  register={register("address", {
                    required: "Address is required",
                  })}
                  error={errors.address}
                />
                <Button
                  disabled={!isDirty}
                  variant={"primary"}
                  width={"full"}
                  size={"xl"}
                >
                  Update
                </Button>
              </form>
            </div>
          )}
        </div>
        <div className="">
          <h2 className="text-2xl font-bold mb-5">Products:</h2>
          <div className="space-y-5">
            {products?.map((product) => {
              return (
                <div key={product?.id} className="flex gap-5">
                  <div>
                    <Image
                      src="/demo.jpg"
                      alt={product?.name}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <Link
                      className="text-lg font-medium hover:text-primary"
                      href={`/products/${product?.slug}`}
                    >
                      {product?.name}
                    </Link>
                    <p>Quantity: {product?.quantity}</p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p>Price: {product?.price}</p>
                    <p>
                      Estimated Price({product?.price} * {product?.quantity}):{" "}
                      {product.quantity * product.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* coupon */}
          {user && (
            <div className="mt-5">
              <label htmlFor="coupon" className="font-semibold">
                Coupon
              </label>
              <div className="flex items-center gap-5 mt-3">
                <input
                  onChange={(e) => setCoupon(e.target.value)}
                  id="coupon"
                  type="text"
                  className="w-full bg-gray-100 border rounded-lg py-3 border-gray-300 focus:ring-2 focus:ring-[#000f7c] focus:border-[#000f7c] outline-none transition-all duration-300 text-gray-800 px-4"
                />
                <Button onClick={handleCoupon} variant={"primary"} size={"xl2"}>
                  {discount ? "Applied" : "Apply"}
                </Button>
              </div>
            </div>
          )}
          {/* Shipping Section */}
          <div className="my-5">
            <h3 className="text-lg font-semibold mb-3">Shipping</h3>
            <div className="space-y-3">
              {shippingMethods.map((method) => (
                <div key={method.id} className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value={method.id}
                      checked={selectedMethodId === method.id}
                      onChange={() => setSelectedMethodId(method.id)}
                      className="accent-black"
                    />
                    <span>{method.title}</span>
                  </label>

                  {selectedMethodId === method.id && method.id === 1 && (
                    <div className="ml-6 mt-2 space-y-2">
                      {area.map((item, i) => (
                        <label
                          key={i}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="deliveryArea"
                            checked={insideDhaka === item.value}
                            onChange={() => setInsideDhaka(item.value)}
                            className="accent-black"
                          />
                          <span>{item.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Advance Payment Section */}
          <div className="my-5">
            <h3 className="text-lg font-semibold mb-3">Advance Payment</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="advancePayment"
                  value="bkash"
                  checked={selectedAdvancePayment === "bkash"}
                  onChange={() => setSelectedAdvancePayment("bkash")}
                  className="accent-black"
                />
                <span>bKash</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="advancePayment"
                  value={3}
                  checked={selectedAdvancePayment === 3}
                  onChange={() => setSelectedAdvancePayment(3)}
                  className="accent-black"
                />
                <span>None</span>
              </label>

              {selectedAdvancePayment === "bkash" && (
                <div className="space-y-3 mt-3 border p-4 rounded-lg bg-pink-50">
                  <p className="text-sm text-gray-700">
                    <strong>Please complete your bKash payment first,</strong>{" "}
                    then fill up the form below.
                  </p>
                  <p className="text-sm text-gray-700">
                    Note:{" "}
                    <span className="font-semibold">
                      2% bKash “Payment” cost
                    </span>{" "}
                    will be added with the net price.
                  </p>
                  <p className="text-sm font-medium">
                    Total amount to send:{" "}
                    <span className="text-red-600 font-semibold">
                      ৳ {Math.round(finalPrice)}
                    </span>
                  </p>
                  <p className="text-sm">
                    bKash Personal Number:{" "}
                    <span className="font-semibold">{bkashNumberPersonal}</span>
                  </p>

                  {/* bKash Form */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Your bKash Number
                      </label>
                      <input
                        type="text"
                        value={bkashNumber}
                        onChange={(e) => setBkashNumber(e.target.value)}
                        placeholder="Enter your bKash number"
                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="Enter trx ID"
                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* final statement */}
          <div className="border-t py-4 space-y-3">
            <div className="flex items-center justify-between text-lg font-bold">
              <p className="">Total Products:</p>
              <p>{totalProducts}</p>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <p className="">Subtotal Price:</p>
              <p>{Math.round(totalPrice)} TK</p>
            </div>
            {discount && (
              <div className="flex items-center justify-between text-lg font-bold">
                <p className="">Discount:</p>
                <p>- {discount} TK</p>
              </div>
            )}
            <div className="flex items-center justify-between text-lg font-bold">
              <p className="">Total Price:</p>
              <p>{Math.round(finalPrice)} TK</p>
            </div>
            <Button
              onClick={handleOrder}
              variant={"primary"}
              width={"full"}
              size={"xl"}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
