"use client";

import { Loader2, PencilLine, PhilippinePeso } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import _ from "lodash";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { onUpdateItem } from "@/lib/actions/item-action";
import { Textarea } from "@/components/shadcn/textarea";
import { itemSchema } from "@/lib/schemas/item-schema";
import { Button } from "@/components/shadcn/button";
import { useClient } from "@/lib/hooks/use-client";
import { useResize } from "@/lib/hooks/use-resize";
import { Input } from "@/components/shadcn/input";
import { ItemType } from "@/lib/types/item-type";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/shadcn/skeleton";

interface UpdateItemProps {
  item: ItemType;
}

export function UpdateItem({ item }: UpdateItemProps) {
  const isClient = useClient();
  const { width } = useResize();
  const [pending, startTransition] = useTransition();
  const [properties, setProperties] = useState({
    name: item.name,
    desc: item.desc,
    price: item.price,
  });
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: { ...properties },
  });

  const onSubmit = (values: z.infer<typeof itemSchema>) => {
    startTransition(() => {
      onUpdateItem({ id: item.id, ...values })
        .then((data) => {
          setProperties({ ...values });
          toast.success(`${data.name} updated successfully!`);
          setOpen(false);
        })
        .catch(() => toast.error("Unable to update item. Please try again."));
    });
  };

  if (!isClient) {
    return <Skeleton className="w-10 min-w-10 lg:w-24 h-10" />;
  }

  const lg = width > 1024;

  const isSame = _.isEqual({ ...properties }, { ...form.getValues() });

  return (
    <Form {...form}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          {lg ? (
            <Button
              variant={"outline"}
              className="gap-x-2 hidden lg:flex transition-all hover:drop-shadow-wide-glow active:scale-95 w-24"
            >
              <PencilLine className="w-5 h-6" />
              Edit
            </Button>
          ) : (
            <Button
              variant={"outline"}
              size={"icon"}
              className="lg:hidden transition-all hover:drop-shadow-wide-glow active:scale-95"
            >
              <PencilLine className="w-4 min-w-4 h-4" />
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className="h-4/5 lg:h-fit overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Update Item</AlertDialogTitle>
            <AlertDialogDescription className="text-foreground/80">
              Update the item details, including its name, description, and
              price, to reflect the latest information or changes.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Wireless Mouse"
                      id="name"
                      disabled={pending}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Ergonomic design with adjustable DPI settings."
                      {...field}
                      id="desc"
                      disabled={pending}
                      name="desc"
                      className="resize-none"
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <div className="relative flex items-center">
                    <FormControl>
                      <Input
                        placeholder="e.g. 25.99"
                        id="price"
                        type="number"
                        step="0.01"
                        disabled={pending}
                        autoComplete="off"
                        className="pl-7"
                        {...field}
                      />
                    </FormControl>
                    <PhilippinePeso
                      className={cn(
                        "w-4 h-6 absolute left-2.5 text-muted-foreground",
                        field.value?.toString().length > 0 && "text-foreground"
                      )}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className="pt-4">
              <AlertDialogCancel
                disabled={pending}
                className="transition-all hover:drop-shadow-wide-glow"
              >
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={pending || isSame}
                className="transition-all hover:drop-shadow-wide-glow"
              >
                {pending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
}
