"use client";

import { usePathname } from "next/navigation";
import { Share } from "lucide-react";

import { Button } from "@acme/ui/button";

export default function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <h2 className="text-xl font-semibold">Главная</h2>

      <Button
        variant="outline"
        size="sm"
        className="ml-auto gap-1.5 text-sm"
        onClick={() =>
          navigator.share({
            title: "Поделиться",
            text: "Поделиться страницей",
            url: `https://localhost:3000/${path}`,
          })
        }
      >
        <Share className="size-3.5" />
        Share
      </Button>
    </header>
  );
}
