import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "Consortium Business Suite — Infrastruttura digitale su misura",
  description:
    "Consulenza aziendale e sviluppo digitale a 360°. Guidiamo professionisti, commercianti e PMI nella transizione al 2.0: fondamenta digitali, sviluppo avanzato e controllo di gestione.",
  keywords: [
    "consulenza digitale",
    "sviluppo web",
    "e-commerce",
    "software custom",
    "controllo di gestione",
    "PMI",
  ],
  openGraph: {
    title: "Consortium Business Suite",
    description:
      "Cuciamo l'infrastruttura digitale del tuo business. Su misura.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} dark`}>
      <body className="bg-ink-900 font-sans text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
