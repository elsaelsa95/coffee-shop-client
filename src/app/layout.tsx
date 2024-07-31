import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee Shop",
  description: "New Experience with Coffee Shop App",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
