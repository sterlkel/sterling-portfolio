import MainNavBar from "@/components/ui/MainNavBar";
import {GoogleAnalytics} from "@next/third-parties/google"
// this is what sets the styling for the whole website
import "../scss/custom.scss";
import type { Metadata } from "next";
import { Montserrat, Mulish } from "next/font/google";

const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mont",
});

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: "Sterling Kelly Portfolio",
  description: "Sterling Kelly's Digital Porfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mont.variable} ${mulish.variable}`}>
      <body>
        <div>
          <div className="bg-primary">
            <MainNavBar />
            {children}
          </div>
        </div>
      </body>
      <GoogleAnalytics gaId="G-LEQ53DHTQB"/>
    </html>
  );
}
