"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  type Dispatch,
} from "react";

type ContactContextValue = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
};

type ContactProviderProps = {
  children: ReactNode;
};

const ContactContext = createContext<ContactContextValue | undefined>(
  undefined
);

const ContactProvider = ({ children }: ContactProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ContactContext.Provider>
  );
};

const useContact = () => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }

  return { ...context };
};

export { ContactProvider };
export default useContact;
