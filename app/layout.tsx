import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ConditionalShell } from "@/components/providers/conditional-shell";
import { LocaleProvider } from "@/components/providers/locale-provider";
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
        <LocaleProvider>
          <SmoothScroll>
            <ConditionalShell>
              {children}
            </ConditionalShell>
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}

