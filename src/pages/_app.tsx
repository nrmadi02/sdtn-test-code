import { type AppType } from "next/dist/shared/lib/utils";
import type { ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import "@/styles/globals.css";
import "quill/dist/quill.snow.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type Page<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

const MyApp: AppType = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NextNProgress />
        <SnackbarProvider
          anchorOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
          autoHideDuration={1000}
        >
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
