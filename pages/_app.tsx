import { css } from '@emotion/react';
import { NextSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="TinCan"
        description="online messenger"
        canonical="www.tincan.com"
      />
      <Head>
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
