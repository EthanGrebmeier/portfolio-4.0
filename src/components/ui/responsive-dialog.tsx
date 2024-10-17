"use client";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

type ResponsiveDialogProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  trigger: React.ReactNode;
};

const ResponsiveDialog = ({
  children,
  title,
  description,
  trigger,
}: ResponsiveDialogProps) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="p-4">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={showDialog} onOpenChange={setShowDialog}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="p-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
