export const metadata = {
  title: "Ethan Grebmeier",
};

import dynamic from "next/dynamic";

const Dither = dynamic(() => import("~/components/dither"), {
  ssr: false,
});

export default async function Page() {
  return <Dither />;
}
