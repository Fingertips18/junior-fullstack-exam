interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      Header
      <main className="h-dvh flex-center">{children}</main>
      Footer
    </>
  );
}
