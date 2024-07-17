import Image from "next/image";
import React from "react";

type KingProps = {
  color: "white" | "black";
};

const King = ({ color }: KingProps) => {
  return (
    <Image
      fill
      src={`/images/chess/pieces/${color}/king.svg`}
      alt={`${color} king`}
    />
  );
};

export default King;
