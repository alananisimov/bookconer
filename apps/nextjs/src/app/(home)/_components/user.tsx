"use client";

import type { ReactNode, SVGProps } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";

import type { Session } from "@acme/auth";
import { cn } from "@acme/ui";
import { Button, buttonVariants } from "@acme/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@acme/ui/dialog";
import { Separator } from "@acme/ui/separator";

import { sidebarNavItems } from "~/constants";

function SignInDialog({ trigger }: { trigger: ReactNode }) {
  const [signInClicked, setSignInClicked] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-display text-2xl font-bold">Войти</h3>
          <p className="text-sm text-gray-500">
            Войдите в аккаунт для дальнейших покупок
          </p>
        </div>

        <div className="flex flex-col space-y-4 px-4 py-8 md:px-16">
          <Button
            disabled={signInClicked}
            className={`${
              signInClicked && "cursor-not-allowed"
            } flex h-10 w-full items-center justify-center space-x-3  text-sm  transition-all duration-75`}
            variant={"outline"}
            onClick={async () => {
              setSignInClicked(true);
              await signIn("google");
            }}
          >
            {signInClicked ? (
              <Loader2Icon color="#808080" className=" animate-spin" />
            ) : (
              <>
                <GoogleLogo />
                <p>Войти через Google</p>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function UserProfileDialog({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  if (!session) return <SignInDialog trigger={children} />;
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="" suppressHydrationWarning>
        <div className=" space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight">Settings</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-x-12 space-y-0">
            <aside className="-mx-4 w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">123</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
function GoogleLogo({ ...props }: { props?: SVGProps<SVGElement> }) {
  return (
    <svg viewBox="0 0 100 100" {...props} className={cn("h-5 w-5")}>
      <linearGradient
        id="b"
        x1="55.41"
        x2="12.11"
        y1="96.87"
        y2="21.87"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#1e8e3e" />
        <stop offset="1" stopColor="#34a853" />
      </linearGradient>
      <linearGradient
        id="c"
        x1="42.7"
        x2="86"
        y1="100"
        y2="25.13"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fcc934" />
        <stop offset="1" stopColor="#fbbc04" />
      </linearGradient>
      <linearGradient
        id="a"
        x1="6.7"
        x2="93.29"
        y1="31.25"
        y2="31.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#d93025" />
        <stop offset="1" stopColor="#ea4335" />
      </linearGradient>
      <path fill="url(#a)" d="M93.29 25a50 50 90 0 0-86.6 0l3 54z" />
      <path fill="url(#b)" d="M28.35 62.5 6.7 25A50 50 90 0 0 50 100l49-50z" />
      <path fill="url(#c)" d="M71.65 62.5 50 100a50 50 90 0 0 43.29-75H50z" />
      <path fill="#fff" d="M50 75a25 25 90 1 0 0-50 25 25 90 0 0 0 50z" />
      <path
        fill="#1a73e8"
        d="M50 69.8a19.8 19.8 90 1 0 0-39.6 19.8 19.8 90 0 0 0 39.6z"
      />{" "}
    </svg>
  );
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
