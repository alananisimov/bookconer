import Link from "next/link";

import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { Progress } from "@acme/ui/progress";

import { api } from "~/trpc/server";
import { OrderCard } from "../../_components/orders";
import { columns } from "../../_components/orders-table/columns";
import { DataTable } from "../../_components/orders-table/data-table";

export const runtime = "edge";

export default async function Dashboard() {
  const orders = await api.order.getAll();
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Ваши заказы</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Тут вы можете удобно создавать, изменять и просматривать заказы,
                созданные на вашем сайте.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={"/dashboard/orders/create"}>
                <Button>Создать тестовый заказ</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Эта неделя</CardDescription>
              {/* TODO: count summarized revenue for 1 week */}
              <CardTitle className="text-4xl">$1329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Этот месяц</CardDescription>
              <CardTitle className="text-3xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label="12% increase" />
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader className="px-7">
            <CardTitle>Заказы</CardTitle>
            <CardDescription>
              Последние заказы из вашего магазина
            </CardDescription>
          </CardHeader>
          <CardContent className="w-[calc(100vw-36px)] sm:w-[calc(100vw-96px)]  lg:w-auto">
            <DataTable data={orders} columns={columns} />
          </CardContent>
        </Card>
      </div>
      <div>
        <OrderCard orders={orders} />
      </div>
    </main>
  );
}
