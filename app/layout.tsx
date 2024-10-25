import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Megumi Sensei",
  description: "Megumi-sensei will help you to speak Japanese",
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
      <body className='antialiased p-6'>
        <Header />
        {children}
      </body>
    </html>
  );
}
