/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { RouterOutputs } from "@acme/api";
import type { orderedBook, user } from "@acme/db";
import { Checkbox } from "@acme/ui/checkbox";

import { DataTableColumnHeader } from "./column-header";
import { statuses } from "./data";
import { DataTableRowActions } from "./row-actions";

export const columns: ColumnDef<RouterOutputs["order"]["getAll"][number]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Клиент" />
    ),
    cell: ({ row }) => {
      const user: user = row.getValue("user");
      return <div className="">{user?.email}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата создания" />
    ),
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      return (
        <span className="w-32 font-medium">{createdAt.toDateString()}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[120px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Общая цена" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[100px] truncate font-medium">
          {row.getValue("totalPrice")} RUB
        </span>
      );
    },
  },
  {
    accessorKey: "orderedBooks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Книги" />
    ),
    cell: ({ row }) => {
      const orderedBooks: orderedBook[] = row.getValue("orderedBooks");
      return (
        <div>
          {orderedBooks.map((orderedBook) => (
            <span key={orderedBook.id}>{orderedBook?.book.title}</span>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
