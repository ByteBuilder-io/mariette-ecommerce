import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "@/components/menus/nav";
import { Global, css } from "@emotion/react";

const theme = extendTheme({
  fonts: {
    heading: "Castoro Titling, sans-serif",
    body: "Castoro Titling, sans-serif",
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={css`
          @font-face {
            font-family: "Castoro Titling";
            src: url("/fonts/castoro-titling-regular.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Manhattan";
            src: url("/fonts/manhattan.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
          }
        `}
      />
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
