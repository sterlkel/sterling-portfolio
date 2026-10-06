import type { Metadata } from "next";
import { fontVars } from "@/trial/fonts";
import "@/trial/tokens.css";
import "./base.css";

export const metadata: Metadata = { title: "Trial · plain CSS" };

// Sets the saved theme before paint to avoid a flash.
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('sk-theme')||'dark'}catch(e){}`;

export default function TrialCssLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
