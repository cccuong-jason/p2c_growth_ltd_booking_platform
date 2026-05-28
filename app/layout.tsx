import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "P2C Growth LTD",
  description: "Modern booking, CRM, and professional partner coordination systems."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <SmoothScroll>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
