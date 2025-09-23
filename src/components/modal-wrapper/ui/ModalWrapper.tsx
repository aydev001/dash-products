import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/shared/ui/dialog"
import { useNavigate } from "react-router-dom"
import React from "react"
import { DialogTitle } from "@radix-ui/react-dialog";

interface ModalWrapperProps {
  children: React.ReactNode;
};

const ModalWrapper = ({ children }: ModalWrapperProps) => {
  const navigate = useNavigate()

  return (
    <Dialog open={true} onOpenChange={() => navigate(-1)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Modal
          </DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, ullam.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default ModalWrapper
