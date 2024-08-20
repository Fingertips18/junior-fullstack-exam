import { ScrollText } from "lucide-react";

import { ItemService } from "@/lib/services/item-service";

import { HomeBreadcrumb } from "./_components/home-breadcrumb";
import { CreateItem } from "./_components/create-item";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function HomePage() {
  const data = await ItemService.getItems();

  return (
    <section className="max-w-screen-lg mx-auto p-4 md:p-6 lg:px-0 lg:py-8 space-y-6">
      <HomeBreadcrumb />

      <div className="p-2 lg:p-4 border rounded-md">
        <div className="flex-between gap-x-6">
          <div className="space-y-1 leading-none">
            <div className="flex items-center gap-x-2 lg:gap-x-4">
              <ScrollText className="w-5 h-5 min-w-5 min-h-5 lg:w-8 lg:h-8" />
              <h6 className="lg:text-2xl font-semibold lg:font-bold">Items</h6>
            </div>
            <p className="text-foreground/80 text-xs lg:text-sm">
              These items were retrieved from the API
            </p>
          </div>

          <CreateItem />
        </div>

        <div className="lg:container mx-auto pt-4 lg:pt-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
}
