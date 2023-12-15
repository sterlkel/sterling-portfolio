import CustomNavBar from "@/components/ui/CustomNavBar";
// this is what sets the styling for the whole website
import "../scss/custom.scss";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mont",
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
    <html lang="en" className={`${mont.variable}`}>
      <body>
        <div>
          <div>
            <CustomNavBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
