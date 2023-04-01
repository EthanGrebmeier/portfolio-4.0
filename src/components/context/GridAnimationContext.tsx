"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
  type Dispatch,
} from "react";

type GridState = "init" | "dragged";

type GridAnimationContextValue = {
  setGridState: Dispatch<GridState>;
  gridState: GridState;
  resetGridPositions: () => void;
  topZIndex: number;
  setTopZIndex: Dispatch<number>;
};

type GridAnimationProviderProps = {
  children: ReactNode;
};

const GridAnimationContext = createContext<
  GridAnimationContextValue | undefined
>(undefined);

const GridAnimationProvider = ({ children }: GridAnimationProviderProps) => {
  const [gridState, setGridState] = useState<GridState>("init");

  const [topZIndex, setTopZIndex] = useState(1);

  const resetGridPositions = () => {
    setGridState("init");
    setTopZIndex(1);
  };

  return (
    <GridAnimationContext.Provider
      value={{
        gridState,
        setGridState,
        resetGridPositions,
        topZIndex,
        setTopZIndex,
      }}
    >
      {children}
    </GridAnimationContext.Provider>
  );
};

const useGridAnimation = () => {
  const context = useContext(GridAnimationContext);

  if (!context) {
    throw new Error(
      "useGridAnimation must be used within a GridAnimationProvider"
    );
  }

  const [zIndex, setZIndex] = useState(0);

  useEffect(() => {
    if (context.topZIndex === 1) {
      setZIndex(0);
    }
  }, [context.topZIndex]);

  const incrementZIndex = () => {
    if (zIndex !== context.topZIndex) {
      context.setTopZIndex(context.topZIndex + 1);
      setZIndex(context.topZIndex + 1);
    }
  };

  return { ...context, incrementZIndex, zIndex };
};

export { GridAnimationProvider };
export default useGridAnimation;
