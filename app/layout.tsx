import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import LanguageProvider from "@/contexts/LanguageContext";
import { quicksand } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Megumi Sensei",
  description: "Megumi Sensei adalah aplikasi yang membantu Anda belajar bahasa Jepang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-theme='bumblebee'
      lang='en'
    >
      <body className={`${quicksand.className} antialiased p-6 min-h-screen bg-gradient-to-br from-white via-white to-secondary/10`}>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
