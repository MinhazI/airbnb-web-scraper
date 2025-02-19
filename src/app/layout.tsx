import type { Metadata } from "next";
import "./globals.css";
import Providers from "./utils/providers";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-gray-700">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
