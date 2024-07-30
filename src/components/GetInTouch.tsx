"use client";

import { Mailbox } from "lucide-react";
import useContact from "./context/ContactContext";
import TactileButton from "./TactileButton";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import ContactModal from "./ContactModal";

const GetInTouch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <TactileButton
          onClick={() => setIsOpen(true)}
          icon={<Mailbox fill="white" size={30} />}
        >
          Get in touch
        </TactileButton>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-fit border-black px-4 py-8 text-black lg:px-8">
        <DrawerHeader className="border-b border-white">
          <DrawerTitle className="text-2xl font-bold">Get in touch</DrawerTitle>
        </DrawerHeader>
        <div className="mx-auto flex flex-col px-4 text-black">
          <ContactModal />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GetInTouch;
