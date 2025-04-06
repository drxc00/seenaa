import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "seenaa",
  description: "When you're bored and want to write something.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/seenaa_logo.png" sizes="any" />
      </head>
      <body className={`${raleway.className} antialiased`}>
        {children}
        <Toaster toastOptions={{
          classNames: {
            description: "text-foreground capitalize",
          },
          style: {
            color: "var(--foreground)",
          }
        }} />
      </body>
    </html>
  );
}
