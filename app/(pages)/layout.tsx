import type { Metadata } from "next";
import { SidebarComponent } from "@/components/layout/sidbar";
import { MainContainer } from "@/components/layout/main-container";

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarComponent>
        <MainContainer className="ml-10">{children}</MainContainer>
      </SidebarComponent>
    </>
  );
}
