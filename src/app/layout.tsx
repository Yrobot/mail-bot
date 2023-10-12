import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mail-Bot",
  description:
    "A useful tool helps you send a smtp email by calling a http request. briefly, smtp to http. And you can manege all the APIs in the dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="lofi">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
