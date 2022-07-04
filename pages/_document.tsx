import { css } from '@emotion/react';
import { Head, Html, Main, NextScript } from 'next/document';

const globalStyles = css`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function Document() {
  return (
    <Html css={globalStyles} lang={'en'}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
