import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

import "../styles/globals.css";
import { Provider } from "jotai";

const BodyFont = Plus_Jakarta_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const junicode = localFont({
  src: [
    {
      path: "../../public/fonts/Junicode.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Junicode-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${BodyFont.className} ${junicode.variable} `}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
