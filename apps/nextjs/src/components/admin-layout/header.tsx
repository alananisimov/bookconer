"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { signOut } from "next-auth/react";

import type { Session } from "@acme/auth";
import { cn } from "@acme/ui";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@acme/ui/breadcrumb";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import { Input } from "@acme/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@acme/ui/sheet";

import { capitalize } from "~/lib";

interface Breadcrumb {
  url: string;
  label: string;
}

function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = [];
  const parts = pathname.split("/").filter((part) => part !== "");

  parts.forEach((part, index) => {
    const url = `/${parts.slice(0, index + 1).join("/")}`;
    breadcrumbs.push({ url, label: capitalize(part) });
  });

  return breadcrumbs;
}

export function Header({ session }: { session: Session | null }) {
  const path = usePathname();
  const breadcrumbs = getBreadcrumbs(path);
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Bookconer</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                path === "/dashboard"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Home className="h-5 w-5" />
              Главная
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/dashboard/orders"
              className={cn(
                "flex items-center gap-4 px-2.5 text-foreground",
                path === "/dashboard/orders"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              Заказы
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/dashboard/products"
              className={cn(
                "flex items-center gap-4 px-2.5 text-foreground",
                path === "/dashboard/products"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Package className="h-5 w-5" />
              Товары{" "}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Заказчики
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Аналитика
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={index} className="flex flex-row items-center gap-x-2">
              <BreadcrumbItem>
                {index !== breadcrumbs.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link href={breadcrumb.url}>{breadcrumb.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={session?.user.image ?? ""}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Настройки</DropdownMenuItem>
          <DropdownMenuItem>Нужна помощь?</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Выйти</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
