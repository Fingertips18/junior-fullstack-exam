import { useState } from "react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/shadcn/dropdown-menu";

interface CopyButtonProps {
  id: number;
}

export function CopyButton({ id }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    if (!id) return;

    setCopied(true);
    navigator.clipboard
      .writeText(id.toString())
      .then(() => toast.success("Copied successfully"))
      .catch(() => toast.error("Failed to copy"));

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <DropdownMenuItem onClick={onClick} className="cursor-pointer">
      {copied ? "Copied" : "Copy item ID"}
    </DropdownMenuItem>
  );
}
