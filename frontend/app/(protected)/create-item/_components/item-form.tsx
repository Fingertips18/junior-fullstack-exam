"use client";

import { Loader2, PhilippinePeso } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { onCreateItem } from "@/lib/actions/item-action";
import { Textarea } from "@/components/shadcn/textarea";
import { itemSchema } from "@/lib/schemas/item-schema";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { cn } from "@/lib/utils";

export function ItemForm() {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      desc: "",
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof itemSchema>) {
    startTransition(() => {
      onCreateItem({ ...values })
        .then((data) => {
          form.reset();
          toast.success(`${data.name} created successfully!`);
        })
        .catch(() => toast.error("Unable to create item. Please try again."));
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    disabled={pending}
                    step="0.01"
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

        <Button
          type="submit"
          disabled={pending}
          className="w-full active:scale-95 transition-all hover:drop-shadow-wide-glow"
        >
          {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
