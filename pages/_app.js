import { useEffect } from "react";
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
    <ChakraProvider>
      <SessionProvider session={session} debug={true}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
