/* eslint-disable @next/next/no-document-import-in-page */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <meta name="msapplication-TileColor" content="#313642" />
          <meta name="theme-color" content="#ff9000" />
          <link rel="manifest" href="/api/manifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
