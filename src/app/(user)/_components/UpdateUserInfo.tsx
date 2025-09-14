"use client";
import Input from "@/components/form/Input";
import SubmitBtn from "@/components/helper/SubmitBtn";
import CustomModal from "@/components/ui/CustomModal";
import { handleAsync } from "@/lib/asyncHandler";
import { callAPI } from "@/services";
import { TUserInfo } from "@/types/type";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const UpdateUserInfo = ({ info }: { info: TUserInfo }) => {
  const [isUpdateInfoModalOpen, setUpdateInfoModalOpen] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserInfo>({ defaultValues: info });
  const onSubmit = async (data: TUserInfo) => {
    const res = await handleAsync(() =>
      callAPI(`/update-user-info`, "PUT", data, "/user/settings")
    );
    if (res) {
      setUpdateInfoModalOpen(false);
    }
  };
  return (
    <div className="absolute top-0 right-0">
      <button
        onClick={() => setUpdateInfoModalOpen(true)}
        style={{ borderRadius: "8px" }}
        className="bg-primary text-white p-1 rounded-md hover:bg-secondary cursor-pointer m-2"
      >
        <SquarePen />
      </button>
      <CustomModal
        isOpen={isUpdateInfoModalOpen}
        setOpen={setUpdateInfoModalOpen}
        title="Delete Address"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            type="text"
            placeholder="Name"
            register={register("name", {
              required: "Name is Required",
            })}
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            register={register("email", {
              required: "Email is Required",
            })}
            error={errors.email}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="Phone Number"
            register={register("phone", {
              required: "Number is Required",
            })}
            error={errors.phone}
          />
          <Input
            label="Address"
            type="text"
            placeholder="Address"
            register={register("address", {
              required: "Address is Required",
            })}
            error={errors.address}
          />
          <SubmitBtn title="Update" />
        </form>
      </CustomModal>
    </div>
  );
};

export default UpdateUserInfo;
