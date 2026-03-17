import type { Metadata } from "next";
import { fontDisplay, fontBody } from "@/lib/fonts";
import PillNav from "@/components/navigation/PillNav";
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
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`} suppressHydrationWarning>
      <body className="grain-overlay antialiased">
        <PillNav />
        {children}
      </body>
    </html>
  );
}
