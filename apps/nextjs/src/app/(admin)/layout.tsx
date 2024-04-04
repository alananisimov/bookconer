import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";
import { ThemeProvider } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { redirect } from "next/navigation";

import { auth } from "@acme/auth";
import { TooltipProvider } from "@acme/ui/tooltip";

import { EdgeStoreProvider } from "~/lib/edgestore";
import { Aside } from "./_components/aside";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_ENV === "production"
      ? "https://bookconer.site"
      : "http://localhost:3000",
  ),
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://bookconer.site",
    siteName: "Create T3 Turbo",
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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();
  if (session?.user.role !== "admin") {
    redirect("/");
  }
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
          <TRPCReactProvider>
            <div className="flex min-h-screen flex-col bg-muted/40">
              <TooltipProvider>
                <Aside />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                  <Header session={session} />
                  <div className="grid min-h-screen">
                    <EdgeStoreProvider>{props.children}</EdgeStoreProvider>
                  </div>
                </div>
              </TooltipProvider>
            </div>
          </TRPCReactProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}