import { notFound } from "next/navigation";

import { ItemService } from "@/lib/services/item-service";
import { Label } from "@/components/shadcn/label";
import { Badge } from "@/components/shadcn/badge";

import { ItemBreadcrumb } from "./_components/item-breadcrumb";
import { DeleteItem } from "./_components/delete-item";
import { EditItem } from "./_components/edit-item";

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
    <section className="max-w-screen-lg mx-auto h-full p-4 md:p-6 lg:px-0 lg:py-8 space-y-6">
      <ItemBreadcrumb item={item} />

      <div className="mt-4 space-y-2">
        <div className="flex-between gap-x-6">
          <Label className="text-2xl lg:text-4xl font-bold leading-tight">
            {item.name}
          </Label>
          <div className="flex-end gap-x-2">
            <EditItem />
            <DeleteItem id={item.id} name={item.name} />
          </div>
        </div>
        <p className="text-foreground/60 text-sm lg:text-base">{item.desc}</p>
        <Badge className="text-lg font-semibold px-6">{price}</Badge>
      </div>
    </section>
  );
}
