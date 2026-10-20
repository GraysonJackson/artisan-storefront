import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidequest Supply — Tabletop Goods & Adventurer's Gear",
  description: "Tabletop accessory shop demonstration with warm brutalist tavern aesthetic, integer-cents calculations, and persistent cart.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-tavern text-parchment font-sans antialiased selection:bg-brass selection:text-tavern min-h-screen">
        {children}
      </body>
    </html>
  );
}
