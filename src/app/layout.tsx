import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const raleway = Raleway({
  variable: "--font-raleWay",
});

export const metadata: Metadata = {
  title: "seenaa",
  description: "Tell your story, inspire others, and leave a lasting legacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
