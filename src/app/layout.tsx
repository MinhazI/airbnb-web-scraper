import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Airbnb Web Scraper",
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
