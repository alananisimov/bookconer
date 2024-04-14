"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { cn } from "@acme/ui";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";

export function Aside() {
  const router = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Bookconer</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                router === "/dashboard"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Главная</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Главная</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/orders"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                router === "/dashboard/orders"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Заказы</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Заказы</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/products"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                router === "/dashboard/products"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Package className="h-5 w-5" />
              <span className="sr-only">Товары</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Товары</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Заказчики</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Заказчики</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Аналитика</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Аналитика</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Настройки</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Настройки</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
