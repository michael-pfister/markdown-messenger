import { css } from '@emotion/react';
import { NextSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/landingPage/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="TinCan"
        description="online messenger"
        canonical="https://www.tincan.com/"
      />
      <Head>
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
