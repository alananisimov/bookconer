"use client";

import { use, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@acme/ui/pagination";
import { Separator } from "@acme/ui/separator";

import { api } from "~/trpc/react";

export function OrderCard({
  data,
}: {
  data: Promise<RouterOutputs["order"]["all"]>;
}) {
  const initialData = use(data);
  const { data: orders } = api.order.all.useQuery(undefined, { initialData });
  const [currentOrder, setCurrentOrder] = useState(orders[0]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order ID: {currentOrder?.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Скопировать Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Дата: {currentOrder?.updatedAt?.toLocaleDateString("ru")}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Отслеживать заказ
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">Больше</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Изменить</DropdownMenuItem>
              <DropdownMenuItem>Экспорт</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Удалить</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Детали заказа</div>
          <ul className="grid gap-3">
            {currentOrder?.orderedBooks?.map((orderedBook) => (
              <li
                key={orderedBook?.id}
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground">
                  {orderedBook.book?.title} x{" "}
                  <span>{orderedBook.bookQuantity}</span>
                </span>
                <span>
                  {orderedBook.bookQuantity * orderedBook.book?.price} RUB
                </span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Доставка</span>
              <span>0 RUB</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Всего</span>
              <span>{currentOrder?.totalPrice} RUB</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className=" gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Информация о доставке</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>Тип: {currentOrder?.delivery?.type}</span>
              <span>Адрес: {currentOrder?.delivery?.location}</span>
            </address>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Информация о заказчике</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Заказчик</dt>
              <dd>{currentOrder?.user.name}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">{currentOrder?.user.email}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Платежная информация</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Mir
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Обновлено{" "}
          <time dateTime="2023-11-23">
            {currentOrder?.updatedAt?.toLocaleDateString("ru")}
          </time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6"
                onClick={() => {
                  setCurrentOrder((current) => {
                    const currentIndex = orders.findIndex(
                      (order) => order.id === current!.id,
                    );
                    if (currentIndex === 0) return current;
                    const nextIndex = (currentIndex - 1) % orders.length;
                    return orders[nextIndex];
                  });
                }}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6"
                onClick={() => {
                  setCurrentOrder((current) => {
                    const currentIndex = orders.findIndex(
                      (order) => order.id === current!.id,
                    );
                    const nextIndex = (currentIndex + 1) % orders.length;
                    return orders[nextIndex];
                  });
                }}
              >
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
