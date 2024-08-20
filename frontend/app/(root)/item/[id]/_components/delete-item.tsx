"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { onDeleteItem } from "@/lib/actions/item-action";
import { Button } from "@/components/shadcn/button";
import { AppRoutes } from "@/constants/routes";
import { useRouter } from "next/navigation";

interface DeleteItemProps {
  id: number;
  name: string;
}

export function DeleteItem({ id, name }: DeleteItemProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onClick = () => {
    startTransition(() => {
      onDeleteItem(id)
        .then(() => {
          toast.success(`${name} has been deleted successfully`);
          router.replace(AppRoutes.home);
        })
        .catch(() =>
          toast.error("There was an error deleting the item. Please try again.")
        );
    });
  };

  return (
    <>
      <Button
        onClick={onClick}
        variant={"destructive"}
        disabled={pending}
        className="gap-x-2 hidden lg:flex w-28 transition-all hover:drop-shadow-danger-glow active:scale-95"
      >
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Trash2 className="w-5 h-5" />
            Delete
          </>
        )}
      </Button>

      <Button
        onClick={onClick}
        variant={"destructive"}
        disabled={pending}
        size={"icon"}
        className="lg:hidden transition-all hover:drop-shadow-danger-glow active:scale-95"
      >
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 min-w-4 h-4" />
        )}
      </Button>
    </>
  );
}
