"use client";

// TODO: Change the usage of the mui theme, should look into doing indivudal customizations, or customizations based on
// my own components, because the use of the theme restricts all components to be client components
import { Banner, Contact } from "@/components";
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
