"use client";
import { Dialog } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useEffect, useState } from "react";
import useContact from "./context/ContactContext";
import TactileButton from "./TactileButton";

const ContactModal = () => {
  const { isOpen, setIsOpen } = useContact();
  const [formError, setFormError] = useState("");
  const { isLoading, error, isError, isSuccess, data, mutate, reset } =
    useMutation({
      mutationKey: ["repoData"],
      mutationFn: (formData: FormData) =>
        axios.post("/contact", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
    });

  useEffect(() => {
    setFormError("");
    reset();
  }, [isOpen, reset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isError) {
        reset();
      }
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [data, reset, isError]);

  const onClose = () => setIsOpen(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const body = formData.get("body");

    const formErrorFields = [];

    if (!name) {
      formErrorFields.push("Name");
    }
    if (!email) {
      formErrorFields.push("Email");
    }
    if (!body) {
      formErrorFields.push("Body");
    }

    if (formErrorFields.length) {
      return setFormError(
        `The following fields are required: ${formErrorFields.join(", ")}`
      );
    }

    setFormError("");

    mutate(formData);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={onClose}
          className="relative z-[10000]"
        >
          <div className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{
                y: 30,
                opacity: 0,
              }}
              exit={{
                y: 30,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              className="relative flex  w-[calc(100vw-36px)] flex-col justify-center rounded-xl  border-2 border-black bg-white px-2 py-4  sm:w-[460px] sm:px-8"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4  border-none bg-none"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                  whileHover={{ rotate: 360 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              </button>

              <Dialog.Title className="mb-2 text-3xl">
                Get in touch
              </Dialog.Title>
              {formError ? (
                <p className="mb-2 flex w-full text-lg text-red-400">
                  {" "}
                  {formError}{" "}
                </p>
              ) : null}

              {error instanceof AxiosError &&
              error?.response?.status === 429 ? (
                <p className="mb-2 flex w-full text-lg text-red-400">
                  Too many requests. Lets slow it down :)
                </p>
              ) : null}
              <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
                <label className="flex flex-col gap-2">
                  Your Name*
                  <input
                    type="text"
                    name="name"
                    className="w-full rounded-xl border-2 border-black px-4 py-2 text-3xl"
                  ></input>
                </label>
                <label className="flex flex-col gap-2">
                  Your Email*
                  <input
                    type="text"
                    name="email"
                    className="w-full rounded-xl border-2 border-black px-4 py-2 text-3xl"
                  ></input>
                </label>
                <label className="flex flex-col gap-2">
                  Message*
                  <textarea
                    name="body"
                    className="h-[200px] w-full rounded-xl border-2 border-black px-4 py-2 text-xl"
                  ></textarea>
                </label>
                <TactileButton
                  disabled={isLoading}
                  onClick={() => setIsOpen(true)}
                  icon={
                    isLoading ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-12 w-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-12 w-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    )
                  }
                  className="mt-4 bg-green-400"
                >
                  {isSuccess
                    ? "Sent! "
                    : isLoading
                    ? "Loading..."
                    : isError
                    ? "Error"
                    : "Send"}
                </TactileButton>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      ) : null}
    </AnimatePresence>
  );
};

export default ContactModal;
