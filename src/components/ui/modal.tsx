"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onclose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onclose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onclose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
