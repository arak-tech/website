import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Arak Holdings | Smart Vending & LED Media",
  description:
    "Arak Holdings rents professional vending machines and mobile LED food delivery boxes for high-impact brand visibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={cn(
          "flex min-h-full flex-col font-sans selection:bg-primary/10 selection:text-primary",
          geist.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
