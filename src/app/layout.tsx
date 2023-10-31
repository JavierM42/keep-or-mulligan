import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keep or Mulligan",
  description:
    "Make better decisions in Magic: The Gathering based on community data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-gray-900 text-gray-100")}>
        <header>
          <nav className="fixed h-12 w-full flex items-center justify-center shadow-lg z-50 bg-white/10 gap-px text-lg">
            <Link href="/" className="no-underline">
              <h1 className="flex items-center gap-1 font-bold">
                Keep or Mulligan
              </h1>
            </Link>
            <div className="hidden md:block font-medium text-white/80">
              : Improve your mulligan decisions based on community data
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
