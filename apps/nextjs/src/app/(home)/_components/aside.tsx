import Image from "next/image";
import Link from "next/link";
import { Heart, Home, LifeBuoy, LucideArchive, SquareUser } from "lucide-react";

import { auth } from "@acme/auth";
import { Button } from "@acme/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";

import book from "~/../public/book.webp";
import { UserProfileDialog } from "./user";

export default async function Aside() {
  const session = await auth();
  return (
    <aside
      className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r"
      suppressHydrationWarning
    >
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Image src={book} alt="" className="size-6" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link href={"/"}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg bg-muted"
                aria-label="Home"
              >
                <Home className="size-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Главная
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link href={"/my/orders"}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Orders"
              >
                <LucideArchive className="size-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Мои заказы
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link href={"/liked"}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Liked"
              >
                <Heart className="size-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Избранное
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Documentation"
            >
              <svg
                className="size-5"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <linearGradient
                  id="a"
                  x1="66.67%"
                  x2="41.67%"
                  y1="16.67%"
                  y2="75%"
                >
                  <stop offset="0" stopColor="#37aee2" />
                  <stop offset="1" stopColor="#1e96c8" />
                </linearGradient>
                <linearGradient
                  id="b"
                  x1="65.97%"
                  x2="85.12%"
                  y1="43.69%"
                  y2="80.24%"
                >
                  <stop offset="0" stopColor="#eff7fc" />
                  <stop offset="1" stopColor="#fff" />
                </linearGradient>
                <circle cx="8" cy="8" fill="url(#a)" r="8" />
                <path
                  d="m6.53333333 11.6666667c-.25917333 0-.21513333-.09786-.30452-.3446334l-.76214666-2.50830663 5.86666663-3.48039334"
                  fill="#c8daea"
                />
                <path
                  d="m6.53333333 11.6666667c.2 0 .28836667-.0914667.4-.2l1.06666667-1.0372-1.33053333-.80233337"
                  fill="#a9c9dd"
                />
                <path
                  d="m6.66933333 9.62733333 3.224 2.38193337c.36789997.2029933.63342667.0978933.72506667-.3415667l1.3123333-6.1842c.13436-.53868-.20534-.783-.5572933-.62321333l-7.706 2.9714c-.52600667.21098-.52294.50444-.09588.6352l1.97753333.61722 4.57819997-2.88833334c.2161267-.13106.4144867-.06059933.25168.08389334"
                  fill="url(#b)"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Наш Telegram
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Help"
            >
              <LifeBuoy className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Помощь
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={0}>
          <UserProfileDialog session={session}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
          </UserProfileDialog>

          <TooltipContent side="right" sideOffset={5}>
            Аккаунт
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
