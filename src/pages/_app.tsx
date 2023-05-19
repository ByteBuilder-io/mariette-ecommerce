import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "@/components/menus/nav";
import { Global, css } from "@emotion/react";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/commons/WhatsAppButton";
import { CounterProvider } from "@/hooks/useContador";
import { useState } from "react";
import Loading from "@/components/commons/Loading";

const theme = extendTheme({
  fonts: {
    heading: "Castoro Titling, sans-serif",
    body: "Montserrat Regular, sans-serif",
  },
});
export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <ChakraProvider theme={theme}>
      {loading && <Loading />}
      <CounterProvider>
        <Global
          styles={css`
            @font-face {
              font-family: "Castoro Titling";
              src: url("/fonts/castoro-titling-regular.ttf") format("truetype");
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: "Montserrat Regular";
              src: url("/fonts/montserrat-regular.ttf") format("truetype");
              font-weight: normal;
              font-style: normal;
            }
          `}
        />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <WhatsAppButton />
      </CounterProvider>
    </ChakraProvider>
  );
}
