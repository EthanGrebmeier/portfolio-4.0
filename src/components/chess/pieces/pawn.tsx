import Image from "next/image";
import React from "react";

type PawnProps = {
  color: "white" | "black";
};

const Pawn = ({ color }: PawnProps) => {
  return (
    <Image
      fill
      src={`/images/chess/pieces/${color}/pawn.svg`}
      alt={`${color} pawn`}
    />
  );
};

export default Pawn;
