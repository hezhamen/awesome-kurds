import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Awesome Kurds</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <script></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}
