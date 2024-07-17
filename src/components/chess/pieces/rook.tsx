import Image from "next/image";
import React from "react";

type RookProps = {
  color: "white" | "black";
};

const Rook = ({ color }: RookProps) => {
  return (
    <Image
      fill
      src={`/images/chess/pieces/${color}/rook.svg`}
      alt={`${color} rook`}
    />
  );
};

export default Rook;
