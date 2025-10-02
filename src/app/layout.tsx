// src/app/layout.tsx (Server Component, no "use client")
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import SmoothScrollProvider from "./(main)/components/SmoothScrollProvider";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Way Housing Group",
  description: "Premium Real Estate & Investment Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        {/* Wrap children with a client-only Lenis component */}
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
