export const metadata = {
  title: "Ethan Grebmeier",
};

import dynamic from "next/dynamic";
import { Rubik_Pixels } from "next/font/google";
import Header from "~/components/header";

const Dither = dynamic(() => import("~/components/dither"), {
  ssr: false,
});


export default async function Page() {
  return (
    <div className="mx-auto h-[100svh] max-w-screen-xl">
      <Header />
      <Dither />
    </div>
  );
}
