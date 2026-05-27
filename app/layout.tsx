import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { wedding } from "@/lib/wedding";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f0ed",
};

export const metadata: Metadata = {
  title: `Сайт пригласительный ${wedding.couple.bride.toUpperCase()}`,
  description: `Приглашение на свадьбу — ${wedding.couple.display}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
