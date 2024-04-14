"use client";

import { Heart, Home, Package } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@acme/ui/pagination";

export default function BottomBar() {
  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-20 flex flex-row justify-center border-t bg-background sm:hidden"
      suppressHydrationWarning
    >
      <nav className=" flex flex-row p-2">
        <Pagination>
          <PaginationContent className="gap-x-3">
            <PaginationItem>
              <PaginationLink href="#" className="" size={"icon-bottom-bar"}>
                <Home className="" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive size={"icon-bottom-bar"}>
                <Package />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size={"icon-bottom-bar"}>
                <Heart />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </nav>
    </footer>
  );
}
