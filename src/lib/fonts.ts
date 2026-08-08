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

// Switzer is licence-restricted from self-hosting. Served from Fontshare's CDN
// and wired to --font-switzer manually in globals.css (see Task 3).
export const SWITZER_CDN =
  "https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap";
