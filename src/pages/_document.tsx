import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

//@ts-ignore
export default class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext) {
    const { renderPage } = ctx;

    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        {
          <Head>
            {/* @ts-ignore */}
            {this.props.styleTags}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Vollkorn:ital@1&display=swap"
              rel="stylesheet"
            />
          </Head>
        }
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
