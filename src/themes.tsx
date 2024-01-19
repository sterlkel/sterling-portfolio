import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  typography: {
    fontFamily: ["var(--font-mont)", "var(--font-mulish)"].join(","),
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-mulish)",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-mulish)",
        },
      },
    },
  },
});
