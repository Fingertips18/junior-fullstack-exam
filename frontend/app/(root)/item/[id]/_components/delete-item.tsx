"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog";
import { onDeleteItem } from "@/lib/actions/item-action";
import { Button } from "@/components/shadcn/button";
import { useResize } from "@/lib/hooks/use-resize";
import { AppRoutes } from "@/constants/routes";
import { Skeleton } from "@/components/shadcn/skeleton";
import { useClient } from "@/lib/hooks/use-client";

interface DeleteItemProps {
  id: number;
  name: string;
}

export function DeleteItem({ id, name }: DeleteItemProps) {
  const isClient = useClient();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { width } = useResize();

  if (!isClient) {
    return <Skeleton className="w-10 min-w-10 lg:w-28 h-10" />;
  }

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

  const lg = width > 1024;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {lg ? (
          <Button
            variant={"destructive"}
            className="gap-x-2 hidden lg:flex w-28 transition-all hover:drop-shadow-danger-glow active:scale-95"
          >
            <Trash2 className="w-5 h-5" />
            Delete
          </Button>
        ) : (
          <Button
            variant={"destructive"}
            size={"icon"}
            className="lg:hidden transition-all hover:drop-shadow-danger-glow active:scale-95"
          >
            <Trash2 className="w-4 min-w-4 h-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-foreground/80">
            This action cannot be undone. This will permanently delete the item
            and remove its data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={pending}
            className="transition-all hover:drop-shadow-wide-glow"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            variant={"destructive"}
            disabled={pending}
            onClick={onClick}
            className="transition-all hover:drop-shadow-danger-glow"
          >
            {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
