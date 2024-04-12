"use client";

import Image from "next/image";
import Link from "next/link";
import { Copy, MoreHorizontal } from "lucide-react";

import type { RouterOutputs } from "@acme/api";
import { Badge } from "@acme/ui/badge";
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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui/table";
import { toast } from "@acme/ui/toast";

import { DeleteBookDialog } from "./dialogs";

export function ProductsTable({
  products,
}: {
  products: RouterOutputs["book"]["all"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Все книги</CardTitle>
        <CardDescription>
          Управляй книгами. Создавай, изменяй и удаляй.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Название</TableHead>
              <TableHead className="hidden sm:table-cell">Жанр</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead className="hidden md:table-cell">Автор</TableHead>
              <TableHead className="hidden sm:table-cell">Количество</TableHead>
              <TableHead className="sm:hidden">Кол-во</TableHead>

              <TableHead className="hidden md:table-cell">
                Время создания
              </TableHead>
              <TableHead>
                <span className="sr-only">Дейтвия</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={product.title}
                    className="aspect-square rounded-md object-cover"
                    height="48"
                    src={product.imageLink}
                    width="48"
                  />
                </TableCell>
                <TableCell className="group font-medium">
                  {product.title}
                  <Button
                    size="icon"
                    variant="outline"
                    className="ml-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy
                      className="h-3 w-3"
                      onClick={async () => {
                        toast.success("Скопировано");
                        await navigator.clipboard.writeText(product.title);
                      }}
                    />

                    <span className="sr-only">Скопировать название</span>
                  </Button>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{product.genre}</Badge>
                </TableCell>
                <TableCell>{product.price}RUB</TableCell>

                <TableCell className="hidden md:table-cell">
                  {product.author}
                </TableCell>
                <TableCell>{product.amount} шт.</TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.createdAt.toLocaleDateString("ru")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Действия</DropdownMenuLabel>
                      <Link href={`/dashboard/products/edit/${product.id}`}>
                        <DropdownMenuItem>Изменить</DropdownMenuItem>
                      </Link>
                      <DeleteBookDialog bookId={product.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Показаны <strong>1-10</strong> из <strong>32</strong> книг
        </div>
      </CardFooter>
    </Card>
  );
}
