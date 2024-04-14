"use client";

import type { Table } from "@tanstack/react-table";
import { Cross2Icon } from "@radix-ui/react-icons";
import { File } from "lucide-react";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import { CardDescription, CardTitle } from "@acme/ui/card";

import { DeleteBooksDialog } from "../dialogs";
import { DataTableViewOptions } from "./view-options";

interface DataTableToolbarProps {
  table: Table<RouterOutputs["book"]["all"][number]>;
}

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        <div className="flex flex-col gap-y-1">
          <CardTitle>Товары</CardTitle>
          <CardDescription>Товары из вашего магазина</CardDescription>
        </div>
        {isFiltered && (
          <Button
            aria-label="Reset Filters"
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="inline-flex gap-x-2">
        {selectedRows.length > 0 && (
          <DeleteBooksDialog
            bookIds={selectedRows.map((row) => row.original.id)}
          />
        )}

        <Button size="sm" variant="outline" className=" gap-1">
          <File className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Экспорт
          </span>
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
