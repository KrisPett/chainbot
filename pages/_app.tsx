import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import Layout from "@/layouts/Layout";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";

const isServer = typeof window === "undefined";

if (!isServer) {
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark");
}
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme={"system"}
      themes={["light", "dark"]}
    >
      <Head>
        <meta name="description" content="chaincue-technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
