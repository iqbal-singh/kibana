import DateFnsAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";

const theme = createTheme({
  shadows: ["none"],
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kibana</title>
        <meta name="description" content="Kibana" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateFnsAdapter}>
          <CssBaseline />

          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
