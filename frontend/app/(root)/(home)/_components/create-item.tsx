import { PencilLine } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import { AppRoutes } from "@/constants/routes";

export function CreateItem() {
  return (
    <>
      <Button
        asChild
        className="hidden lg:flex font-semibold transition-all hover:drop-shadow-wide-glow active:scale-95"
      >
        <Link href={AppRoutes.createItem} className="flex-center gap-x-4">
          <PencilLine className="w-6 h-6" />
          Create Item
        </Link>
      </Button>

      <Button
        asChild
        size={"icon"}
        className="min-w-10 lg:hidden transition-all hover:drop-shadow-wide-glow active:scale-95"
      >
        <Link href={AppRoutes.createItem}>
          <PencilLine className="w-5 h-5" />
        </Link>
      </Button>
    </>
  );
}
