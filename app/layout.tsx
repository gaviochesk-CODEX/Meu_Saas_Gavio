import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meu SaaS",
  description: "SaaS simples criado com Next.js 14 e Tailwind CSS."
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

