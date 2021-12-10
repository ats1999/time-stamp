import { useEffect } from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";
import "../styles/global.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    try {
      localStorage.setItem("chakra-ui-color-mode", "dark");
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <>
    <Head>
     <title>@time-stamp - Track your time, everywhere!</title>
        <meta property={"og:title"} content={"@time-stamp - Track your time, everywhere!"} />
        <meta
          property="og:image"
          content={"https://user-images.githubusercontent.com/54087826/145571944-37669ebc-2883-435a-8d22-242f86bfc425.png"}
        />
    </Head>
    <ChakraProvider>
      <SessionProvider session={session} debug={true}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
</>
  )
}

export default MyApp;
