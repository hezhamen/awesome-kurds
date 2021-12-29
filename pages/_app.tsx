import { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.sass";
import { changeTheme } from "../utils";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.ondblclick = () => changeTheme();
  });

  return <Component {...pageProps} />;
}

export default MyApp;
