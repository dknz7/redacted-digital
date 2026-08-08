import type { Metadata } from "next";
import { fontDisplay, fontAnnot, SWITZER_CDN } from "@/lib/fonts";
import { Nav } from "@/components/rd/Nav";
import { Footer } from "@/components/rd/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redacted Digital | Less Phone Time, More Tool Time",
  description:
    "Smart websites that capture leads, book jobs, and follow up automatically. Central Coast & Hunter Valley, NSW.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${fontDisplay.variable} ${fontAnnot.variable}`}
      suppressHydrationWarning
    >
      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
      <link rel="stylesheet" href={SWITZER_CDN} />
      <body className="antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
