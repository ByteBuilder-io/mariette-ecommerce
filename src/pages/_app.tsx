import { useState, useEffect, lazy, Suspense } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "@/components/menus/nav";
import { Global, css } from "@emotion/react";
import WhatsAppButton from "@/components/commons/WhatsAppButton";
import { CounterProvider } from "@/hooks/useContador";
import { DrawerProvider } from "@/hooks/useDrawer";
import { initGA, logPageView, logEvent } from "../utils/analytics";

const theme = extendTheme({
  fonts: {
    heading: "Castoro Titling, sans-serif",
    body: "Montserrat Regular, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  useEffect(() => {
    initGA();
    logPageView();
    logEvent();
  }, []);

  useEffect(() => {
    setIsComponentLoaded(true);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CounterProvider>
        <DrawerProvider>
          <Global
            styles={css`
              @font-face {
                font-family: "Castoro Titling";
                src: url("/fonts/castoro-titling-regular.ttf")
                  format("truetype");
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
          <Suspense fallback={<div>Loading...</div>}>
            {isComponentLoaded && <Component {...pageProps} />}
          </Suspense>
          {isComponentLoaded && (
            <>
              <WhatsAppButton />
            </>
          )}
        </DrawerProvider>
      </CounterProvider>
    </ChakraProvider>
  );
}
