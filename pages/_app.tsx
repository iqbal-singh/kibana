import { MUI_THEME } from "@/constants/index";
import DateFnsAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kibana</title>
        <meta name="description" content="Kibana" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={MUI_THEME}>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <CssBaseline />
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
