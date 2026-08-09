import { League_Gothic, JetBrains_Mono } from "next/font/google";

export const fontDisplay = League_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-league",
  display: "swap",
});

export const fontAnnot = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Switzer is licence-restricted from self-hosting. Served from Fontshare's CDN;
// the family name is declared directly in the @theme block in globals.css.
export const SWITZER_CDN =
  "https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap";
