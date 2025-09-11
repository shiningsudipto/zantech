import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "./dialog";

type TModalProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: ReactNode;
};

const CustomModal = ({ isOpen, setOpen, title, children }: TModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[600px]">
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
