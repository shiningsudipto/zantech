"use client";
import Input from "@/components/form/Input";
import SubmitBtn from "@/components/helper/SubmitBtn";
import CustomModal from "@/components/ui/CustomModal";
import { handleAsync } from "@/lib/asyncHandler";
import { callAPI } from "@/services";
import { TAddress } from "@/types/type";
import { SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Addresses = ({ data }: { data: TAddress[] }) => {
  const [isUpdateAddressModalOpen, setUpdateModalOpen] =
    useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<TAddress>();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddress>({ defaultValues: selectedAddress });
  const onSubmit = async (data: TAddress) => {
    const payload = {
      f_name: data?.f_name,
      l_name: data?.l_name,
      phone: data?.phone,
      address: data?.address,
      city: data?.city,
      zip: data?.zip,
    };
    const res = await handleAsync(() =>
      callAPI(
        `/shipping-addresses/${selectedAddress?.id}`,
        "PUT",
        payload,
        "/user/addresses"
      )
    );
    if (res) {
      setUpdateModalOpen(false);
    }
  };
  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const res = await handleAsync(() =>
        callAPI(`/shipping-addresses/${id}`, "DELETE", null, "/user/addresses")
      );
      if (res) {
        Swal.fire({
          title: "Deleted!",
          text: res?.message,
          icon: "success",
        });
      }
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      reset(selectedAddress);
    }
  }, [selectedAddress, reset]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((item) => (
          <div
            key={item.id}
            className="p-5 border rounded-md space-y-2 transition-colors duration-300 hover:bg-gray-50 relative"
          >
            <p>
              <span className="font-bold">Name:</span> {item.f_name}{" "}
              {item.l_name}
            </p>
            <p>
              <span className="font-bold">Phone:</span> {item.phone}
            </p>
            <p>
              <span className="font-bold">Address:</span> {item.address}
            </p>
            <p>
              <span className="font-bold">City:</span> {item.city}
            </p>
            <p>
              <span className="font-bold">Zip:</span> {item.zip}
            </p>
            <div className="flex items-center gap-5 absolute right-0 top-0 m-2">
              <button
                onClick={() => handleDelete(item?.id)}
                title="Delete"
                className="bg-primary text-white p-1 rounded-md hover:bg-secondary cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={() => {
                  setSelectedAddress(item);
                  setUpdateModalOpen(true);
                }}
                title="Edit"
                className="bg-primary text-white p-1 rounded-md hover:bg-secondary cursor-pointer"
              >
                <SquarePen size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <CustomModal
        isOpen={isUpdateAddressModalOpen}
        setOpen={setUpdateModalOpen}
        title="Update Address"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="First Name"
            type="text"
            placeholder="First Name"
            register={register("f_name", {
              required: "First name is required",
            })}
            error={errors.f_name}
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Last Name"
            register={register("l_name", { required: "Last name is required" })}
            error={errors.l_name}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="Phone Number"
            register={register("phone", {
              required: "Phone is required",
              minLength: { value: 11, message: "Phone must be 11 digits" },
              maxLength: { value: 11, message: "Phone must be 11 digits" },
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
            placeholder="Shipping address"
            register={register("address", { required: "Address is required" })}
            error={errors.address}
          />
          <Input
            label="City"
            type="text"
            placeholder="ex: Dhaka"
            register={register("city", { required: "City is required" })}
            error={errors.address}
          />
          <Input
            label="Zip"
            type="number"
            placeholder="ex: 1100"
            register={register("zip", { required: "Zip is required" })}
            error={errors.zip}
          />
          <SubmitBtn title="Update" />
        </form>
      </CustomModal>
    </>
  );
};

export default Addresses;
