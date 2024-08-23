"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
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
import { signUpSchema } from "@/lib/schemas/sign-up-schema";
import { AuthService } from "@/lib/services/auth-service";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { AppRoutes } from "@/constants/routes";

export function SignUpForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    startTransition(() => {
      AuthService.signUp(values)
        .then(() => {
          toast.success("You are now registered. Sign in now!");
          router.replace(AppRoutes.signIn);
        })
        .catch((e) => {
          console.error(e);
          toast.error("Unable to register. Please try again.");
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input
                  autoComplete="username"
                  id="username"
                  placeholder="e.g. juniordev123"
                  disabled={pending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  id="email"
                  type="email"
                  placeholder="e.g. email@example.com"
                  disabled={pending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  id="password"
                  type="password"
                  disabled={pending}
                  placeholder="e.g. 4r^bL7!aZ$8yF&2p"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={pending}
          className="w-full transition-all hover:drop-shadow-wide-glow active:scale-95"
        >
          {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
