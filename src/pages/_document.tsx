import * as React from "react";
// next
import Document, { Html, Head, Main, NextScript } from "next/document";
// emotion

// ----------------------------------------------------------------------

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta
            name="description"
            content="Test code Sinar Digital Nusantara"
          />
          <meta
            name="keywords"
            content="react,application,dashboard,sinar,digital,nusantara,sinar digital nusantara"
          />
          <meta name="author" content="Nur Ahmadi" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
