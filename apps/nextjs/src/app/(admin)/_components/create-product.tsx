"use client";

import type { z } from "zod";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader } from "lucide-react";
import { useForm } from "react-hook-form";

import type { RouterOutputs } from "@acme/api";
import { cn } from "@acme/ui";
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { Textarea } from "@acme/ui/textarea";
import { toast } from "@acme/ui/toast";
import { createBookSchema } from "@acme/validators";

import { api } from "~/trpc/react";
import { CreateNewAuthorDialog, CreateNewGenreDialog } from "./dialogs";
import { SingleImageDropzoneUsage } from "./dropzone";

interface ProductEditFormProps {
  authors: RouterOutputs["book"]["allAuthors"];
  genres: RouterOutputs["book"]["allGenres"];
}

export function EditProduct({ authors, genres }: ProductEditFormProps) {
  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
  });
  const utils = api.useUtils();
  const router = useRouter();
  const createBook = api.book.create.useMutation({
    onSuccess: async () => {
      router.push("/dashboard/products");
      toast.success("Книга успешно создана!");
      await utils.book.all.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be an admin in to create a book"
          : "Не удалось создать книгу",
      );
    },
  });
  function onSubmit(values: z.infer<typeof createBookSchema>) {
    createBook.mutate(values);
  }

  const [allAuthors, setAllAuthors] = useState(authors);

  const addAuthorToList = (newAuthor: string) => {
    setAllAuthors([...allAuthors, { author: newAuthor }]);
  };
  const [allGenres, setAllGenres] = useState(genres);

  const addGenreToList = (newGenre: string) => {
    setAllGenres([...allGenres, { genre: newGenre }]);
  };
  const [imageLoad, setImageLoad] = useState(false);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href={"/dashboard/products"}>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Новая книга
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                Книга
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link href={"/dashboard/products"}>
                  <Button variant="outline" size="sm" type="button">
                    Отменить
                  </Button>
                </Link>
                <Button size="sm" type="submit">
                  Добавить книгу
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Детали книги</CardTitle>
                    <CardDescription>
                      Добавьте нужные параметры в вашу книгу
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Название</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Название"
                                  {...field}
                                  className="w-full"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Описание</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Описание"
                                  {...field}
                                  className="min-h-32"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Параметры книги</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="genre"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Жанр</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите жанр" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {allGenres.map((genre, i) => (
                                    <SelectItem value={genre.genre} key={i}>
                                      {genre.genre}
                                    </SelectItem>
                                  ))}
                                  <CreateNewGenreDialog
                                    action={addGenreToList}
                                  />
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Автор</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="author"
                                    aria-label="Выберите автора"
                                  >
                                    <SelectValue placeholder="Выберите автора" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {allAuthors.map((author, i) => (
                                    <SelectItem key={i} value={author.author}>
                                      {author.author}
                                    </SelectItem>
                                  ))}

                                  <CreateNewAuthorDialog
                                    action={addAuthorToList}
                                  />
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ограничения</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Кол-во</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Количество"
                                  {...field}
                                  type="number"
                                  className="w-full"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Цена</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Цена</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Цена в рублях"
                                  {...field}
                                  type="number"
                                  className="w-full"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Статус книги</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Статус</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value ?? ""}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="status"
                                    aria-label="Выберите статус"
                                  >
                                    <SelectValue placeholder="Выберите статус" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="active">
                                    Активен
                                  </SelectItem>
                                  <SelectItem value="disabled">
                                    Отключен
                                  </SelectItem>
                                  <SelectItem value="archived">
                                    Архивирован
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Изображения</CardTitle>
                    <CardDescription>Добавьте изображения</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="relative flex rounded-md bg-muted p-4">
                        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
                          {imageLoad && (
                            <Loader className="size-5 animate-spin" />
                          )}
                        </div>
                        <Image
                          alt="Product image"
                          className={cn(
                            "aspect-square h-full w-full rounded-md object-contain",
                            imageLoad && " brightness-50",
                          )}
                          height="300"
                          src={
                            form.getValues("imageLink") || "/placeholder.svg"
                          }
                          width="300"
                        />
                      </div>
                      <div className=" w-full">
                        <FormField
                          control={form.control}
                          name="imageLink"
                          render={({ field }) => (
                            <FormItem>
                              <SingleImageDropzoneUsage
                                save={field.onChange}
                                setImageLoaded={setImageLoad}
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Отменить
              </Button>
              <Button
                size="sm"
                onClick={() => form.handleSubmit(onSubmit)}
                type="button"
              >
                Сохранить
              </Button>
            </div>
          </div>
        </main>
      </form>
    </Form>
  );
}
