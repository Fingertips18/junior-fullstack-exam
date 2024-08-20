"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

import { AppThemes } from "@/constants/themes";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Toaster
        richColors
        theme={
          resolvedTheme === AppThemes.dark ? AppThemes.dark : AppThemes.light
        }
        position="bottom-right"
      />
      {children}
    </>
  );
}
