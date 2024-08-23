import { ToggleMode } from "@/components/toggle-mode";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="w-full h-dvh flex-center relative p-4">
      {children}
      <div className="fixed bottom-4 lg:bottom-6 right-4 lg:right-6">
        <ToggleMode />
      </div>
    </main>
  );
}
