import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CursorEffect from "@/components/CursorEffect";
import ScrollReveal from "@/components/ScrollReveal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Helindu Senadheera | Portfolio",
  description: "Computer Science undergraduate & Software Engineer. Showcasing my projects in Android, Web, and VR engineering including ScholarFlow, Northstar, and Boarding-Bee.",
  authors: [{ name: "Helindu Senadheera" }],
  keywords: ["Software Engineer", "Portfolio", "Next.js", "TypeScript", "Kotlin", "Unity VR", "Helindu"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
  }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CursorEffect />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
