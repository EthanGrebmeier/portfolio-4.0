import { Plus_Jakarta_Sans } from "next/font/google";
import HomePage from "../components/HomePage";

export const metadata = {
  title: "Ethan Grebmeier",
};

const font = Plus_Jakarta_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default async function Page() {
  return (
    <div className={font.className}>
      <HomePage />
    </div>
  );
}
