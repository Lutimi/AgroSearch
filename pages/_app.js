import "../styles/globals.css";
import { useState } from "react";

import { SessionProvider } from "next-auth/react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Router from "next/router";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setIsLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setIsLoading(false);
  });

  if (isLoading)
    return (
      <div className="full-loader">
        <div className="lds-dual-ring"></div>
      </div>
    );

  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
