"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, HeartOff } from "lucide-react";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import { Card, CardContent } from "@acme/ui/card";
import { Skeleton } from "@acme/ui/skeleton";
import { toast } from "@acme/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";

import { api } from "~/trpc/react";

export function BooksList(props: {
  books: Promise<RouterOutputs["book"]["all"]>;
}) {
  // TODO: Make `useSuspenseQuery` work without having to pass a promise from RSC
  const initialData = use(props.books);
  const { data: books } = api.book.all.useQuery(undefined, {
    initialData,
  });

  if (books.length === 0) {
    return (
      <div className="relative flex flex-col gap-4">
        <BookCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((b) => {
        return <BookCard key={b.id} book={b} />;
      })}
    </div>
  );
}

export function BookCard(props: {
  book: RouterOutputs["book"]["all"][number];
}) {
  const [liked, setLiked] = useState(false);
  return (
    <Card className="flex flex-col">
      <Link href={`/${props.book.title}`}>
        <div className="flex h-full max-h-56 w-full rounded-t-lg bg-muted transition-all duration-300 dark:bg-muted/70 dark:hover:bg-muted ">
          <Image
            alt="Profile picture"
            className="object-contain"
            height="280"
            src={props.book.imageLink}
            width="280"
          />
        </div>
      </Link>
      <CardContent className="flex h-full flex-col justify-between p-4">
        <div>
          <h2 className="line-clamp-2 text-xl font-bold">{props.book.title}</h2>
          <h3 className="text-sm text-gray-500 sm:text-base">
            от {props.book.author}
          </h3>
        </div>
        <div className="">
          <p className="mt-2 font-bold">{props.book.price} RUB</p>
          <div className="mt-4 flex space-x-2">
            <Button className="flex-1" size="sm">
              Добавить
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon_sm"
                  variant="outline"
                  onClick={() => {
                    setLiked((v) => !v);
                    toast.success(
                      liked ? "Убрано из избранного" : "Добавлено в избранное",
                    );
                  }}
                >
                  {liked ? (
                    <HeartOff className="size-4" />
                  ) : (
                    <Heart className="size-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Добавить в избранное
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BookCardSkeleton() {
  return (
    <div className="flex max-w-72 flex-col space-y-3">
      <Skeleton className="h-44 rounded-xl" />
      <div className="space-y-2 p-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="flex w-72 space-x-2 px-2">
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
}
