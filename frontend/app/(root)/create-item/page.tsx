import { PencilLine } from "lucide-react";

import { CreateBreadcrumb } from "./_components/create-breadcrumb";
import { ItemForm } from "./_components/item-form";

export default function CreateItemPage() {
  return (
    <section className="max-w-screen-lg mx-auto h-full p-4 md:p-6 lg:px-0 lg:py-8 space-y-6">
      <CreateBreadcrumb />

      <div className="p-4 border rounded-md">
        <div className="space-y-1 leading-none">
          <div className="flex items-center gap-x-2 lg:gap-x-4">
            <PencilLine className="w-5 h-5 min-w-5 min-h-5 lg:w-8 lg:h-8" />
            <h6 className="lg:text-2xl font-semibold lg:font-bold">Create</h6>
          </div>
          <p className="text-foreground/80 text-xs lg:text-sm">
            Kindly fill-out all fields to create new item.
          </p>
        </div>

        <div className="lg:container mx-auto pt-4 lg:pt-10">
          <ItemForm />
        </div>
      </div>
    </section>
  );
}
