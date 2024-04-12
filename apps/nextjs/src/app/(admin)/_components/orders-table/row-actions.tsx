"use client";

import type { Row } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import { DeleteOrderDialog } from "../dialogs";

interface DataTableRowActionsProps {
  row: Row<RouterOutputs["order"]["getAll"][number]>;
}

export function DataTableRowActions({ row: row }: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Изменить</DropdownMenuItem>
        <DropdownMenuItem>Скопировать</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DeleteOrderDialog orderId={row.original.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
