import "../styles/globals.css";
import {ThemeProvider} from "next-themes";
import Head from "next/head";
import Layout from "@/layouts/Layout";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import * as React from "react";
import type {AppProps} from "next/app";
import {SessionProvider} from 'next-auth/react';

const isServer = typeof window === "undefined";
if (!isServer) {
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark");
}

const queryClient = new QueryClient();

const App = ({Component, pageProps}: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"system"}
          themes={["light", "dark"]}
        >
          <Head>
            <meta name="description" content="chaincue-technology"/>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;

