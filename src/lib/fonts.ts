import { JetBrains_Mono, Outfit } from "next/font/google";

export const fontDisplay = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700", "800"],
});

export const fontBody = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});
