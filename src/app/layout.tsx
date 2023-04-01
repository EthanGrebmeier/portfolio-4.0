import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";

import "../styles/globals.css";

export const HeadingFont = EB_Garamond({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const BodyFont = Plus_Jakarta_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
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
      <body className={`${BodyFont.className} bg-blue-100`}>{children}</body>
    </html>
  );
}
