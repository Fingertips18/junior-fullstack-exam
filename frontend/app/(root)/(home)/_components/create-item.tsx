import { PencilLine } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/shadcn/button";
import { AppRoutes } from "@/constants/routes";

export function CreateItem() {
  return (
    <>
      <Button
        asChild
        className="font-semibold transition-all hover:drop-shadow-wide-glow active:scale-95"
      >
        <Link
          href={AppRoutes.createItem}
          className="hidden lg:flex-center gap-x-4"
        >
          <PencilLine className="w-6 h-6" />
          Create Item
        </Link>
      </Button>

      <Button
        asChild
        size={"icon"}
        className="min-w-10 transition-all hover:drop-shadow-wide-glow active:scale-95"
      >
        <Link href={AppRoutes.createItem} className="lg:hidden ">
          <PencilLine className="w-5 h-5" />
        </Link>
      </Button>
    </>
  );
}
