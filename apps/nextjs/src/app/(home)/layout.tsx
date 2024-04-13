import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";
import { ThemeProvider } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { TooltipProvider } from "@acme/ui/tooltip";

import Aside from "~/app/(home)/_components/aside";
import BottomBar from "./_components/bottom-bar";

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
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
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
                {props.children}
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
