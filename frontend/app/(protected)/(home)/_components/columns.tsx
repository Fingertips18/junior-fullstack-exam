"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import { ItemType } from "@/lib/types/item-type";

import { DataTableColumnHeader } from "./data-table-column-header";
import { ViewItemDetails } from "./view-item-details";
import { CopyButton } from "./copy-button";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <CopyButton id={id} />
            <DropdownMenuSeparator />
            <ViewItemDetails item={row.original} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
