import Link from "next/link";

import { DropdownMenuItem } from "@/components/shadcn/dropdown-menu";
import { ItemType } from "@/lib/types/item-type";
import { AppRoutes } from "@/constants/routes";

interface ViewItemDetailsProps {
  item: ItemType;
}

export function ViewItemDetails({ item }: ViewItemDetailsProps) {
  return (
    <DropdownMenuItem asChild className="cursor-pointer">
      <Link href={`${AppRoutes.item}/${item.id}`}>View item details</Link>
    </DropdownMenuItem>
  );
}
