import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoL Draft Tool",
  description: "League of Legends Draft Simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
