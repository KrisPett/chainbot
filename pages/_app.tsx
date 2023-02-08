import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import Layout from '@/layouts/Layout';

const isServer = typeof window === 'undefined';

if (!isServer) {
  if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'dark');
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute={'class'}
      defaultTheme={'system'}
      themes={['light', 'dark']}
    >
      <Head>
        <meta name="description" content="chaincue-technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
