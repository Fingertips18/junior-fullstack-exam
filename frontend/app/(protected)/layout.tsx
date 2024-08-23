import { Header } from "./_components/header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <>
      <Header />
      <main className="w-full h-dvh pt-14">{children}</main>
    </>
  );
}
