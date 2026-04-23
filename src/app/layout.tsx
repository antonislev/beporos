import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "BEPOROS — Poros Island Society",
  description: "Culture, events, and transmissions from Poros Island. By locals, for locals.",
  openGraph: {
    title: "BEPOROS",
    description: "Poros Island Society",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[56px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}