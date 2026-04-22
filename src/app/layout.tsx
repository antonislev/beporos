import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: "BEPOROS — Athens Street Society",
  description:
    "Local streetwear brand born in Athens. Society, drops, and designs that speak the language of the streets.",
  openGraph: {
    title: "BEPOROS",
    description: "Athens Street Society",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <CartDrawer />
        <main className="flex-1 pt-[64px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}