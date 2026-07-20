import MainNavBar from "@/components/ui/MainNavBar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { mantineTheme, montserrat } from "@/theme";
import "@mantine/core/styles.css";
// this is what sets the styling for the whole website
import "../scss/custom.scss";

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
    <html
      lang="en"
      {...mantineHtmlProps}
      className={`${montserrat.variable} ${mulish.variable}`}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={mantineTheme} defaultColorScheme="auto">
          <div>
            <div className="bg-primary">
              <MainNavBar />
              {children}
            </div>
          </div>
        </MantineProvider>
        <GoogleAnalytics gaId="G-LEQ53DHTQB" />
      </body>
    </html>
  );
}
