import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import Providers from "@/components/providers";
import Nav from "@/components/nav";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fira = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anthony Lazkani — Software Engineer · Micro-Systems",
  description:
    "Portfolio of Anthony Lazkani — Software Engineer exploring how complex systems operate at the micro level. Voice pipelines, AI agents, and full-stack systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fira.variable}`}>
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
