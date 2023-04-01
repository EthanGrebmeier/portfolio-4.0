"use client";

import { Html, OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useFrame, useStore, useThree } from "@react-three/fiber";
import {
  type ReactNode,
  useRef,
  useLayoutEffect,
  Suspense,
  useMemo,
  useEffect,
} from "react";
import { Vector3 } from "three";
import { AsciiEffect } from "three-stdlib";

interface ModelViewProps {
  children: ReactNode;
  autoRotate?: boolean;
}

const AsciiRender = () => {
  const { size, gl, scene, camera } = useThree();

  const renderIndex = 1;
  const bgColor = "transparent";
  const fgColor = "black";
  const characters = " .:-+*=%@#~";
  const invert = true;
  const color = false;
  const resolution = 0.15;

  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, {
      invert,
      color,
      resolution,
    });
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0px";
    effect.domElement.style.left = "0px";
    effect.domElement.style.pointerEvents = "none";
    return effect;
  }, [characters, invert, color, resolution]);

  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor;
    effect.domElement.style.backgroundColor = bgColor;
  }, [fgColor, bgColor]);

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.style.opacity = "0";
    gl?.domElement?.parentNode?.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = "1";
      gl?.domElement?.parentNode?.removeChild(effect.domElement);
    };
  }, [effect]);

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera);
  }, renderIndex);
};

const ModelView = ({ children, autoRotate = false }: ModelViewProps) => {
  const ref = useRef();

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [-300, 100, 550], fov: 50, zoom: 0.7 }}
    >
      <color attach="background" args={["black"]} />
      <Suspense
        fallback={
          <Html center>
            <p className="text-white"> Loading... </p>
          </Html>
        }
      >
        <Stage controls={ref} shadows adjustCamera environment="city">
          {children}
        </Stage>
      </Suspense>
      <AsciiRender />
      <OrbitControls ref={ref} autoRotate={autoRotate} />
    </Canvas>
  );
};

export default ModelView;
