"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Button } from "@/components/shadcn/button";
import { useClient } from "@/lib/hooks/use-client";
import { AppThemes } from "@/constants/themes";
import { Hint } from "@/components/hint";

export function ToggleMode() {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();
  const isClient = useClient();

  if (!isClient) {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }

  const isDark = resolvedTheme === AppThemes.dark;

  return (
    <DropdownMenu modal={false}>
      <Hint asChild label="Mode" side="bottom">
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full transition-all hover:drop-shadow-glow"
          >
            {isDark ? (
              <Moon className="w-5 h-5 lg:w-6 lg:h-6" />
            ) : (
              <Sun className="w-5 h-5 lg:w-6 lg:h-6" />
            )}
          </Button>
        </DropdownMenuTrigger>
      </Hint>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(systemTheme!)}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
