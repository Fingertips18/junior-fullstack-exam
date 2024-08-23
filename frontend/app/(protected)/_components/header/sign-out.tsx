"use client";

import { useRouter } from "next/navigation";
import { DoorOpen } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { onRemoveTokens } from "@/lib/actions/token-action";
import { Button } from "@/components/shadcn/button";
import { AppRoutes } from "@/constants/routes";
import { Hint } from "@/components/hint";

export function SignOut() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onClick = () => {
    startTransition(() => {
      onRemoveTokens()
        .then(() => {
          toast.success("Signed out successfully");
          router.replace(AppRoutes.signIn);
        })
        .catch(() => toast.error("Failed to sign out. Please try again."));
    });
  };

  return (
    <Hint asChild label="Sign out">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-full transition-all hover:drop-shadow-glow"
        onClick={onClick}
      >
        <DoorOpen className="w-5 h-5 lg:w-6 lg:h-6" />
      </Button>
    </Hint>
  );
}
