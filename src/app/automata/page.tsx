export const metadata = {
  title: "Ethan Grebmeier",
};

import dynamic from "next/dynamic";

const Automata = dynamic(() => import("~/components/automata"), {
  ssr: false,
});

export default async function Page() {
  return <Automata />;
}
