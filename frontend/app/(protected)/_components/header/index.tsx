import Link from "next/link";

import { ToggleMode } from "@/components/toggle-mode";
import { AppRoutes } from "@/constants/routes";

import { Title } from "./title";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="h-14 w-full flex-center fixed top-0 z-50 border-b px-4 md:px-8 lg:px-0 bg-background/10 backdrop-blur-lg">
      <nav className="max-w-screen-lg w-full h-full flex-between">
        <Link
          href={AppRoutes.home}
          className="flex items-center gap-x-2 transition-all hover:scale-95 hover:drop-shadow-glow"
        >
          <Logo />
          <Title />
        </Link>

        <ToggleMode />
      </nav>
    </header>
  );
}
