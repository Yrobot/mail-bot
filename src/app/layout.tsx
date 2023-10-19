import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import NavBar from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";
import { ModalLayer } from "@/components/Modal";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: "/favicon.ico",
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
        <div className="relative z-0 flex flex-auto flex-row items-start justify-start">
          <div className="h-full w-80 flex-none shadow">
            <SideMenu />
          </div>
          <div className="h-full flex-auto overflow-x-hidden">{children}</div>
        </div>
        <ModalLayer />
        <Toaster />
      </body>
    </html>
  );
}
