import { Dialog, DialogContent, DialogHeader } from "@/shared/ui/dialog"
import { useNavigate } from "react-router-dom"
import React from "react"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface ModalWrapperProps {
  children: React.ReactNode;
  title?: string
};

const ModalWrapper = ({ children, title = "Modal" }: ModalWrapperProps) => {
  const navigate = useNavigate()

  return (
    <Dialog open={true} onOpenChange={() => navigate(-1)}>
      <DialogContent className="rounded-sm p-4">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default ModalWrapper
