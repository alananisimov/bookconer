import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";
import { ThemeProvider } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import Header from "~/components/index-page/layout/header";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import Script from "next/script";

import { TooltipProvider } from "@acme/ui/tooltip";

import Aside from "~/components/index-page/layout/aside";
import BottomBar from "~/components/index-page/layout/bottom-bar";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://bookconer.site"
      : "http://localhost:3000",
  ),
  title: "Bookcorner - простой магазин книг",
  description: "Купить вашу любимую книгу стало еще проще!",
  openGraph: {
    title: "Bookcorner - простой магазин книг",
    description: "Купить вашу любимую книгу стало еще проще!",
    url: "https://bookconer.site",
    siteName: "Bookcorner - простой магазин книг",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        defer
        src="https://bookconer-analytics.vercel.app/script.js"
        data-website-id="cec54e79-2f43-4821-b0bf-40f9550325dd"
      />

      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <TRPCReactProvider>
              <div className="grid h-screen w-full sm:pl-[53px]">
                <Aside />
                <div className="flex flex-col">
                  <Header />
                  {props.children}
                </div>
                <BottomBar />
              </div>
            </TRPCReactProvider>

            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
