"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LayoutGroup, MotionConfig } from "framer-motion";
import { type ReactNode } from "react";
import { BoundaryProvider } from "./BoundaryContext";
import { ContactProvider } from "./ContactContext";
import { GridAnimationProvider } from "./GridAnimationContext";

interface ContextWrapperProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ContextWrapper = ({ children }: ContextWrapperProps) => {
  return (
    <>
      <MotionConfig reducedMotion="user">
        <LayoutGroup>
          <BoundaryProvider>
            <ContactProvider>
              <QueryClientProvider client={queryClient}>
                {" "}
                <GridAnimationProvider>{children} </GridAnimationProvider>
              </QueryClientProvider>
            </ContactProvider>
          </BoundaryProvider>
        </LayoutGroup>
      </MotionConfig>
    </>
  );
};

export default ContextWrapper;
