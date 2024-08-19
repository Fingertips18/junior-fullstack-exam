"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ItemType } from "@/lib/types/item-type";

import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<ItemType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Name"
        column={column}
        className="text-foreground font-bold"
      />
    ),
  },
  {
    accessorKey: "desc",
    header: "Description",
    cell: ({ row }) => (
      <p className="text-foreground/50 line-clamp-2">{row.original.desc}</p>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Name"
        column={column}
        className="text-foreground font-bold"
      />
    ),
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(row.original.price);

      return <p className="font-semibold text-center">{formatted}</p>;
    },
  },
];
