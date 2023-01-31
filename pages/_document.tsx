import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-touch-icon.png"/>
        <link rel="icon" type="image/ico" sizes="32x32" href="/static/favicon.ico"/>
        <link rel="manifest" href="/static/site.webmanifest"/>
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#000000"/>
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff"/>
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000"/>
      </Head>
      <body className="bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white ">
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}
