import Image from "next/image";
import React from "react";

type KnightProps = {
  color: "white" | "black";
};

const Knight = ({ color }: KnightProps) => {
  return (
    <Image
      fill
      src={`/images/chess/pieces/${color}/knight.svg`}
      alt={`${color} knight`}
    />
  );
};

export default Knight;
