"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  type RefObject,
} from "react";

type BoundaryContextValue = {
  boundaryRef?: RefObject<HTMLDivElement>;
};

type BoundaryProviderProps = {
  children: ReactNode;
};

const BoundaryContext = createContext<BoundaryContextValue | undefined>(
  undefined,
);

const BoundaryProvider = ({ children }: BoundaryProviderProps) => {
  const boundaryRef = useRef<HTMLDivElement>(null);

  return (
    <BoundaryContext.Provider value={{ boundaryRef: boundaryRef }}>
      <div className="flex h-full w-full justify-center " ref={boundaryRef}>
        {children}
      </div>
    </BoundaryContext.Provider>
  );
};

const useBoundary = () => {
  const context = useContext(BoundaryContext);

  if (!context) {
    throw new Error("useBoundary must be used within a BoundaryProvider");
  }

  return { ...context };
};

export { BoundaryProvider };
export default useBoundary;
