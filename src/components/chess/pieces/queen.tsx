import Image from "next/image";
import React from "react";

type QueenProps = {
  color: "white" | "black";
};

const Queen = ({ color }: QueenProps) => {
  return (
    <Image
      fill
      src={`/images/chess/pieces/${color}/queen.svg`}
      alt={`${color} queen`}
    />
  );
};

export default Queen;
