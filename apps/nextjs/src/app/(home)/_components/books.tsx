"use client";

import type { z } from "zod";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, HeartOff, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import { Card, CardContent } from "@acme/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { Skeleton } from "@acme/ui/skeleton";
import { toast } from "@acme/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";
import { createBookSchema } from "@acme/validators";

import { api } from "~/trpc/react";
import { ResponsiveSheet } from "./responsive-dialog";

export function CreateBookDrawer() {
  return (
    <ResponsiveSheet
      title="Создать книгу"
      description=" Configure the settings for the model and messages."
      trigger={
        <Button variant="ghost" size="icon">
          <Plus className="size-4" />
          <span className="sr-only">Создать книгу</span>
        </Button>
      }
    >
      <div className="grid w-full items-start gap-6 overflow-auto p-2 pt-2 md:pt-4">
        <div className="grid gap-3">
          <CreateBookForm />
        </div>
      </div>
    </ResponsiveSheet>
  );
}

export function CreateBookForm() {
  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "123",
      description: "123",
      amount: 1,
      author: "123",
      imageLink: "http://localhost:3000/book.webp",
      genre: "123",
      price: 1488,
    },
  });

  const utils = api.useUtils();
  const createBook = api.book.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.book.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to post"
          : "Failed to create post",
      );
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-2xl flex-col gap-4"
        onSubmit={form.handleSubmit(async (data) => {
          createBook.mutate(data);
        })}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Amount" type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Price" type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageLink"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Image link" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Genre" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Author" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}

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
