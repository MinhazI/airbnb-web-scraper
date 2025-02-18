import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "News Web Scraper",
  description: "Created by Minhaz Irphan Mohamed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
