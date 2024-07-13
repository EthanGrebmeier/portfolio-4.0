"use client";

import { Mailbox } from "lucide-react";
import useContact from "./context/ContactContext";
import TactileButton from "./TactileButton";

const GetInTouch = () => {
  const { setIsOpen } = useContact();

  return (
    <TactileButton
      onClick={() => setIsOpen(true)}
      icon={<Mailbox fill="white" size={30} />}
    >
      Get in touch
    </TactileButton>
  );
};

export default GetInTouch;
