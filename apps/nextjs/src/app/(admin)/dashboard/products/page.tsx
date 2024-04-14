import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { ProductsTable } from "~/components/products-page/products-table";
import { columns } from "~/components/products-page/products-table/columns";
import { api } from "~/trpc/server";

export default async function Dashboard() {
  const products = api.book.all();
  return (
    <main className="mt-2 grid flex-1 grid-cols-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
      <Card className="max-w-md">
        <CardHeader className="pb-3">
          <CardTitle>Ваши товары</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Тут вы можете удобно создавать, изменять и просматривать товары,
            созданные на вашем сайте.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-row justify-between">
          <Link href={"/dashboard/orders/create"}>
            <Button className="gap-1.5">
              <PlusCircle className="h-4 w-4" />
              <span className=" sm:whitespace-nowrap">Создать книгу</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardContent className="max-w-[calc(100vw-32px)] pt-6 md:max-w-[calc(100vw-96px)]">
          <ProductsTable columns={columns} orders={products} />
        </CardContent>
      </Card>
    </main>
  );
}
