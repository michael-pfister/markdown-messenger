import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TinCan</title>
        <meta name="description" content="online messaging service" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;