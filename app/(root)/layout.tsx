import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import { ToastProvider } from "@/lib/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcella - Store",
  description: "Shop here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClerkProvider>
          <ToastProvider />
          <Navbar />
          <div className="flex-1 p-10">{children}</div>
        </ClerkProvider>
      </body>
    </html>

  );
}
