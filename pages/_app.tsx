import { AppProps } from "next/app";
import "../styles/globals.sass";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
