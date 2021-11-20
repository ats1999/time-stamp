import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
