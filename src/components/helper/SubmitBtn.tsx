"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

const SubmitBtn = ({ title = "Submit" }: { title: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      variant={"primary"}
      size={"xl"}
      width={"full"}
      type="submit"
    >
      {pending && <Loader2Icon className="animate-spin" />}
      {title}
    </Button>
  );
};

export default SubmitBtn;
