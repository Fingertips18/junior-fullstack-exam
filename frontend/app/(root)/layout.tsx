import { Header } from "./_components/header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      <main className="w-full h-dvh pt-14">{children}</main>
    </>
  );
}
