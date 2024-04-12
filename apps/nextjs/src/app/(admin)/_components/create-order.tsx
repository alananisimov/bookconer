"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  ChevronLeft,
  Mailbox,
  Minus,
  PersonStanding,
  Plus,
  Truck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { RouterOutputs } from "@acme/api";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { toast } from "@acme/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@acme/ui/tooltip";

import { env } from "~/env";
import { api } from "~/trpc/react";

const createOrderFormSchema = z.object({
  deliveryType: z.enum(["avito", "pr", "self"]),
  deliveryAddress: z.object({ lat: z.number(), lng: z.number() }),
  books: z
    .array(
      z.object({
        bookId: z.number().positive(),
        bookQuantity: z.number().positive(),
        title: z.string().min(1),
      }),
    )
    .nonempty(),
});

export function CreateOrderPage({
  books,
}: {
  books: RouterOutputs["book"]["all"];
}) {
  const form = useForm<z.infer<typeof createOrderFormSchema>>({
    resolver: zodResolver(createOrderFormSchema),
    defaultValues: {
      deliveryType: "avito",
      books: [],
    },
  });
  const utils = api.useUtils();
  const router = useRouter();
  const createBook = api.order.create.useMutation({
    onSuccess: async () => {
      toast.success("Заказ успешно создан!");
      await utils.book.all.invalidate();
      router.push("/dashboard/orders");
      router.refresh();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be an admin in to create a book"
          : "Не удалось создать книгу",
      );
    },
  });
  function onSubmit(values: z.infer<typeof createOrderFormSchema>) {
    createBook.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid w-full max-w-lg flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href={"/dashboard/orders"}>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Назад</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Новый заказ
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                тест
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link href={"/dashboard/orders"}>
                  <Button variant="outline" size="sm" type="button">
                    Отменить
                  </Button>
                </Link>
                <Button size="sm" type="submit">
                  Создать заказ
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Книги</CardTitle>
                    <CardDescription>
                      Добавьте книги, которые вы хотите заказать
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="books"
                          render={({ field: field }) => (
                            <FormItem className="flex flex-col space-y-2">
                              <FormControl>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size={"sm"}
                                      className="w-fit"
                                    >
                                      Выбрать
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    className="w-56"
                                    side="bottom"
                                  >
                                    <DropdownMenuLabel>Книги</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {books?.map((book) => (
                                      <DropdownMenuCheckboxItem
                                        className="flex"
                                        key={book.id}
                                        onCheckedChange={(isChecked) => {
                                          const newValue = isChecked
                                            ? [
                                                ...field.value,
                                                {
                                                  bookId: book.id,
                                                  bookQuantity: 1,
                                                  title: book.title,
                                                },
                                              ]
                                            : field.value.filter(
                                                (item) =>
                                                  item.bookId !== book.id,
                                              );
                                          field.onChange(newValue);
                                        }}
                                        checked={field.value?.some(
                                          (v) => v.bookId === book.id,
                                        )}
                                      >
                                        <span>{book.title}</span>
                                      </DropdownMenuCheckboxItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </FormControl>
                              <FormMessage />

                              <span className="flex w-full flex-col font-mono text-xs">
                                {field.value.length > 0
                                  ? field.value.map((v, index) => (
                                      <div
                                        key={index}
                                        className="flex flex-row items-center justify-between"
                                      >
                                        {v.title +
                                          " x " +
                                          v.bookQuantity?.toString()}
                                        <div className="space-x-2">
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                variant={"ghost"}
                                                size={"icon"}
                                                type="button"
                                                onClick={() => {
                                                  const updatedBooks =
                                                    field.value.map((book) => {
                                                      if (
                                                        book.bookId === v.bookId
                                                      ) {
                                                        return {
                                                          ...book,
                                                          bookQuantity:
                                                            book.bookQuantity +
                                                            1,
                                                        };
                                                      }
                                                      return book;
                                                    });
                                                  field.onChange(updatedBooks);
                                                }}
                                              >
                                                <Plus className="size-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              Увеличить
                                            </TooltipContent>
                                          </Tooltip>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                variant={"ghost"}
                                                size={"icon"}
                                                type="button"
                                                onClick={() => {
                                                  const updatedBooks =
                                                    field.value
                                                      .map((book) => {
                                                        if (
                                                          book.bookId ===
                                                          v.bookId
                                                        ) {
                                                          if (
                                                            book.bookQuantity ===
                                                            1
                                                          ) {
                                                            return null;
                                                          }
                                                          return {
                                                            ...book,
                                                            bookQuantity:
                                                              book.bookQuantity -
                                                              1,
                                                          };
                                                        }
                                                        return book;
                                                      })
                                                      .filter(
                                                        (book) => book !== null,
                                                      );
                                                  field.onChange(updatedBooks);
                                                }}
                                              >
                                                <Minus className="size-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              Уменьшить
                                            </TooltipContent>
                                          </Tooltip>
                                        </div>
                                      </div>
                                    ))
                                  : "ничего"}
                              </span>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Доставка</CardTitle>
                    <CardDescription>
                      Добавьте нужные параметры доставки
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="deliveryAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Место доставки</FormLabel>
                              <FormControl>
                                <Map
                                  setSelectedLocation={field.onChange}
                                  selectedLocation={field.value}
                                />
                              </FormControl>
                              <FormMessage />
                              <span className="font-mono text-xs">
                                Выбрано: {field.value?.lat}, {field.value?.lng}
                              </span>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="deliveryType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Тип доставки</FormLabel>
                              <FormControl>
                                <Select
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="[&_[data-description]]:hidden [&_[data-details]]:hidden">
                                    <SelectValue placeholder="Выберите ваш тип доставки" />
                                  </SelectTrigger>
                                  <SelectContent className="w-72 sm:w-full">
                                    <SelectItem value="avito">
                                      <div className="flex items-start gap-3 text-muted-foreground">
                                        <Truck className="size-5" />
                                        <div className="grid gap-0.5">
                                          <p>
                                            <span className="font-medium text-foreground">
                                              Курьером{" "}
                                            </span>
                                            <span data-details>
                                              avito доставка
                                            </span>
                                          </p>
                                          <p
                                            className="text-xs"
                                            data-description
                                          >
                                            Быстрее всех остальных в большистве
                                            случаях
                                          </p>
                                        </div>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="self">
                                      <div className="flex items-start gap-3 text-muted-foreground">
                                        <PersonStanding className="size-5" />
                                        <div className="grid gap-0.5">
                                          <p>
                                            <span className="font-medium text-foreground">
                                              Лично{" "}
                                            </span>
                                            <span data-details>
                                              при встрече
                                            </span>
                                          </p>
                                          <p
                                            className="text-xs"
                                            data-description
                                          >
                                            Дороже, но безопаснее
                                          </p>
                                        </div>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="pr">
                                      <div className="flex items-start gap-3 text-muted-foreground">
                                        <Mailbox className="size-5" />
                                        <div className="grid gap-0.5">
                                          <p>
                                            <span className="font-medium text-foreground">
                                              По Почте Россия{" "}
                                            </span>
                                          </p>
                                          <p
                                            className="text-xs"
                                            data-description
                                          >
                                            Удобно, но больше проверок
                                          </p>
                                        </div>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                              <span className="font-mono text-xs">
                                Выбрано: {field.value}
                              </span>
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
                type="submit"
              >
                Создать заказ
              </Button>
            </div>
          </div>
        </main>
      </form>
    </Form>
  );
}

function Map({
  setSelectedLocation,
  selectedLocation,
}: {
  setSelectedLocation: (location: google.maps.LatLngLiteral) => void;
  selectedLocation: google.maps.LatLngLiteral;
}) {
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral>();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ lat: latitude, lng: longitude });
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setSelectedLocation]);

  return (
    <LoadScript googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
        }}
        zoom={8}
        center={
          currentLocation ?? { lat: 55.75399067561998, lng: 37.62047714970248 }
        }
      >
        {selectedLocation && (
          <Marker
            position={selectedLocation}
            onDrag={(e) =>
              setSelectedLocation({
                lat: e.latLng!.lat(),
                lng: e.latLng!.lng(),
              })
            }
            title="Текущее местоположение"
            draggable
            label={"Я"}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}
