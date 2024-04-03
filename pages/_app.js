import AppBar from "../components/AppBarMenu";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import "../styles/doc_viewer.css";
import "../styles/swiper.css";
import Router from "next/router";
import { MenuItemsStateTracker } from "../context/global_state";
import Head from "next/head";
import Loading from "../components/Loading";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // //criar loading spiner ou progresBar
  // // para servir de meio termo quando fazemos o fetch de dados no servidor
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const start = () => {
  //     console.log("start");
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     console.log("finished");
  //     setLoading(false);
  //   };
  //   Router.events.on("routeChangeStart", start);
  //   Router.events.on("routeChangeComplete", end);
  //   Router.events.on("routeChangeError", end);
  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   };
  // }, []);

  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <link rel="shortcut icon" href="moz-flag.png" type="image/x-icon" />
        </Head>
        {/* {loading ? <Loading /> : <Component {...pageProps} />} */}
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
