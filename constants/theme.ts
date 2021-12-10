import { createTheme } from "@mui/material/styles";

export const BAR_CHART_FILL = "#00a69a";
export const BAR_CHART_STROKE = "#00a69b";
export const MUI_THEME = createTheme({
  typography: {
    fontFamily: "'Inter', BlinkMacSystemFont, Helvetica, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#07C",
    },
    secondary: {
      main: "#F04E98",
    },
    success: {
      main: "#00BFB3",
    },
    warning: {
      main: "#FEC514",
    },
    error: {
      main: "#BD271E",
    },
  },
});
