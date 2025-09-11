"use client";
import Input from "@/components/form/Input";
import SubmitBtn from "@/components/helper/SubmitBtn";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/ui/CustomModal";
import { handleAsync } from "@/lib/asyncHandler";
import { callAPI } from "@/services";
import { useAuthStore } from "@/stores/authStore";
import { TAddress } from "@/types/type";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateAddress = () => {
  const [isCreateAddressModalOpen, setCreateAddressModalOpen] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddress>();
  const { user } = useAuthStore();
  const onSubmit = async (data: TAddress) => {
    const payload = {
      user_id: user?.id,
      ...data,
    };
    const res = await handleAsync(() =>
      callAPI(`/shipping-addresses`, "POST", payload, "/user/addresses")
    );
    if (res) {
      setCreateAddressModalOpen(false);
    }
  };
  return (
    <div>
      <Button
        onClick={() => setCreateAddressModalOpen(true)}
        variant={"primary"}
        size={"lg"}
      >
        Create Address
      </Button>
      <CustomModal
        isOpen={isCreateAddressModalOpen}
        setOpen={setCreateAddressModalOpen}
        title="Delete Address"
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
    </div>
  );
};

export default CreateAddress;
