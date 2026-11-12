import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fontVars } from "@/redesign/fonts";
import { Nav } from "@/redesign/chrome/Nav";
import { Footer } from "@/redesign/chrome/Footer";
import { themeScript } from "@/redesign/chrome/ThemeToggle";
import { siteUrl } from "@/redesign/site";
import "@/redesign/tokens.css";
import "@/redesign/base.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Sterling Kelly", template: "%s · Sterling Kelly" },
  description: "Software engineer who builds small, useful tools and writes about them.",
  // Fallback share image for pages that don't set their own.
  openGraph: { siteName: "Sterling Kelly", images: [{ url: "/Sterling.jpg", width: 1403, height: 951, alt: "Sterling Kelly" }] },
};

// Root layout for the redesign. Old pages keep their own root layout in (legacy) until they're replaced.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-LEQ53DHTQB" />
      </body>
    </html>
  );
}
