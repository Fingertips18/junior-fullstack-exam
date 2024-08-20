import { Button } from "@/components/shadcn/button";
import { PencilLine } from "lucide-react";

export function EditItem() {
  return (
    <>
      <Button
        variant={"secondary"}
        className="gap-x-2 hidden lg:flex transition-all hover:drop-shadow-wide-glow active:scale-95"
      >
        <PencilLine className="w-5 h-6" />
        Edit
      </Button>

      <Button
        variant={"secondary"}
        size={"icon"}
        className="lg:hidden transition-all hover:drop-shadow-wide-glow active:scale-95"
      >
        <PencilLine className="w-4 min-w-4 h-4" />
      </Button>
    </>
  );
}
