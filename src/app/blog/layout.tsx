import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "~/components/header";

export default function BlogLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background">
      <Header />
      {children}
    </div>
  );
}
