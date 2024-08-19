import { PencilLine } from "lucide-react";

import { Button } from "@/components/shadcn/button";

export function CreateItem() {
  return (
    <>
      <Button className="hidden lg:flex gap-x-4 font-semibold transition-all hover:drop-shadow-wide-glow active:scale-95">
        <PencilLine className="w-6 h-6" />
        Create Item
      </Button>

      <Button
        size={"icon"}
        className="min-w-10 lg:hidden transition-all hover:drop-shadow-wide-glow active:scale-95"
      >
        <PencilLine className="w-5 h-5" />
      </Button>
    </>
  );
}
