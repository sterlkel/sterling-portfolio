"use client";

import { About, Banner, Contact, Projects, Resume } from "@/components";
import { muiTheme } from "@/themes";
import { ThemeProvider } from "@mui/material";
export default function Home() {
  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <Banner />
        <Contact />
      </ThemeProvider>
    </>
  );
}
