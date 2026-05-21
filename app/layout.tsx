import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteFooter, SiteHeader } from "@/components/site-shell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "P2C Growth LTD",
  description: "Modern booking, CRM, and professional partner coordination systems."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
