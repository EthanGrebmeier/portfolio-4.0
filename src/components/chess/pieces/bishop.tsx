import Image from "next/image";
import React from "react";

type BishopProps = {
  color: "white" | "black";
};

const Bishop = ({ color }: BishopProps) => {
  return (
    <Image
      fill
      src={`/images/chess/pieces/${color}/bishop.svg`}
      alt={`${color} bishop`}
    />
  );
};

export default Bishop;
