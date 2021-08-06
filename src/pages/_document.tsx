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
          //@ts-ignore
          <Head>{this.props.styleTags}</Head>
        }
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
