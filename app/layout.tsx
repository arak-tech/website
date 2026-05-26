import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
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
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col font-sans selection:bg-primary/10 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
