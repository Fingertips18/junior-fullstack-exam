import { notFound } from "next/navigation";

import { ItemService } from "@/lib/services/item-service";
import { Label } from "@/components/shadcn/label";
import { Badge } from "@/components/shadcn/badge";

import { ItemBreadcrumb } from "./_components/item-breadcrumb";
import { DeleteItem } from "./_components/delete-item";
import { UpdateItem } from "./_components/update-item";
import { Skeleton } from "@/components/shadcn/skeleton";

interface ItemPageProps {
  params: {
    id: number;
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const item = await ItemService.getItem(params.id);

  if (!item) {
    notFound();
  }

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(item.price);

  return (
    <section className="max-w-screen-lg mx-auto p-4 md:p-6 lg:px-0 lg:py-8 space-y-6">
      <ItemBreadcrumb item={item} />

      <div className="mt-4 space-y-2">
        <div className="flex-between gap-x-6">
          <Label className="text-2xl lg:text-4xl font-bold leading-tight">
            {item.name}
          </Label>
          <div className="flex-end gap-x-2">
            <UpdateItem item={item} />
            <DeleteItem id={item.id} name={item.name} />
          </div>
        </div>
        <p className="text-foreground/60 text-sm lg:text-base">{item.desc}</p>
        <Badge className="lg:text-lg lg:font-normal lg:px-6">{price}</Badge>
      </div>
    </section>
  );
}
