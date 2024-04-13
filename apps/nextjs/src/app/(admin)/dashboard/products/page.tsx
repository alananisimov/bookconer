import Link from "next/link";
import { File, PlusCircle } from "lucide-react";

import { Button } from "@acme/ui/button";
import { Card, CardContent } from "@acme/ui/card";

import { api } from "~/trpc/server";
import { columns } from "../../_components/books-table/columns";
import { ProductsTable } from "../../_components/books-table/data-table";

export default async function Dashboard() {
  const products = api.book.all();
  return (
    <main className="mt-2 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Экспорт
            </span>
          </Button>
          <Link href={"/dashboard/products/create"}>
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Создать книгу
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="max-w-[calc(100vw-32px)] pt-6">
          <ProductsTable columns={columns} orders={products} />
        </CardContent>
      </Card>
    </main>
  );
}
