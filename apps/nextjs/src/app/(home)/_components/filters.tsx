"use client";

import {
  Bird,
  Filter,
  Mailbox,
  PersonStanding,
  Rabbit,
  Star,
  Truck,
  Turtle,
} from "lucide-react";

import type { RouterOutputs } from "@acme/api";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@acme/ui/drawer";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";

export function FilterDrawer({
  minAndMax,
}: {
  minAndMax: RouterOutputs["book"]["minAndMaxPrice"];
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Filter className="size-4" />
          <span className="sr-only">Сортировка</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh] ">
        <DrawerHeader>
          <DrawerTitle>Сортировка</DrawerTitle>
          <DrawerDescription>
            Настройте сортировку книг в выдаче
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
          <FilterList minAndMax={minAndMax} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function FilterSidebar({
  minAndMax,
}: {
  minAndMax: RouterOutputs["book"]["minAndMaxPrice"];
}) {
  return (
    <div className="relative col-span-1 hidden flex-col items-start gap-8 md:flex">
      <form className="grid items-start gap-6">
        <FilterList minAndMax={minAndMax} />
      </form>
    </div>
  );
}
function StarRating({
  stars,
  className,
}: {
  stars: number;
  className: string;
}) {
  return (
    <div className={cn("inline-flex", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3 text-yellow-600 dark:text-yellow-300",
            i >= stars && "text-gray-400",
          )}
        />
      ))}
    </div>
  );
}

export function FilterList({
  minAndMax,
}: {
  minAndMax: RouterOutputs["book"]["minAndMaxPrice"];
}) {
  const { min, max } = minAndMax;
  return (
    <>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Фильтры</legend>
        <div className="grid gap-3">
          <Label htmlFor="model">Автор</Label>
          <Select>
            <SelectTrigger
              id="model"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Выберите автора" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genesis">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Rabbit className="size-5" />
                  <div className="grid gap-0.5">
                    <p>
                      Neural{" "}
                      <span className="font-medium text-foreground">
                        Genesis
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      Our fastest model for general use cases.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="explorer">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Bird className="size-5" />
                  <div className="grid gap-0.5">
                    <p>
                      Neural{" "}
                      <span className="font-medium text-foreground">
                        Explorer
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      Performance and speed for efficiency.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="quantum">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Turtle className="size-5" />
                  <div className="grid gap-0.5">
                    <p>
                      Neural{" "}
                      <span className="font-medium text-foreground">
                        Quantum
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      The most powerful model for complex computations.
                    </p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="top-p">Цена</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-3">
              <Input type="number" placeholder={`от ${min} руб.`} min={min} />
            </div>
            <div className="grid gap-3">
              <Input type="number" placeholder={`до ${max} руб.`} max={max} />
            </div>
          </div>
          <Label htmlFor="role">Рейтинг товара</Label>
          <Select defaultValue="any">
            <SelectTrigger>
              <SelectValue placeholder="Выберите ваш город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3" className="flex items-center">
                <span>От</span>

                <StarRating stars={3} className="ml-1" />
              </SelectItem>
              <SelectItem value="5" className="flex items-center">
                <span>От</span>

                <StarRating stars={4} className="ml-1" />
              </SelectItem>
              <SelectItem value="any">Любой</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </fieldset>

      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Доставка</legend>
        <div className="grid gap-3">
          <Label htmlFor="role">Город</Label>
          <Select defaultValue="moscow">
            <SelectTrigger>
              <SelectValue placeholder="Выберите ваш город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="moscow">Москва</SelectItem>
              <SelectItem value="petersburg">Санкт Питербург</SelectItem>
              <SelectItem value="kazan">Казань</SelectItem>
              <SelectItem value="novosibirsk">Новосибирск</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="role">Тип доставки</Label>
          <Select defaultValue="avito">
            <SelectTrigger className="[&_[data-description]]:hidden [&_[data-details]]:hidden">
              <SelectValue placeholder="Выберите ваш тип доставки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="avito">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Truck className="size-5" />
                  <div className="grid gap-0.5">
                    <p>
                      <span className="font-medium text-foreground">
                        Курьером{" "}
                      </span>
                      <span data-details>avito доставка</span>
                    </p>
                    <p className="text-xs" data-description>
                      Быстрее всех остальных в большистве случаях
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
                      <span data-details>при встрече</span>
                    </p>
                    <p className="text-xs" data-description>
                      Дороже, но безопаснее
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="mail">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Mailbox className="size-5" />
                  <div className="grid gap-0.5">
                    <p>
                      <span className="font-medium text-foreground">
                        По Почте Россия{" "}
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      Удобно, но больше проверок
                    </p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </fieldset>
      <Button size={"sm"} className="md:hidden">
        Сохранить
      </Button>
    </>
  );
}
