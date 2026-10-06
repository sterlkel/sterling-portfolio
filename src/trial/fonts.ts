import { Fraunces, Inter, JetBrains_Mono, Newsreader } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], axes: ["opsz"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], axes: ["opsz"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const fontVars = [display, sans, mono, serif].map(f => f.variable).join(" ");
