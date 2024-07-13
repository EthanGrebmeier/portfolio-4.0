import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background">
      <div className="group mx-auto flex max-w-screen-xl px-4 pt-6">
        <Link href="/" className="flex items-center gap-4">
          <Image
            width={40}
            height={40}
            alt="My doodled face"
            src="/images/Smile.svg"
          />
          <p className="font-serif text-4xl group-hover:underline">
            {" "}
            Ethan Grebmeier{" "}
          </p>
        </Link>
      </div>
      {children}
    </div>
  );
}
