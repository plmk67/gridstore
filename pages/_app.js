import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AppWrapper } from "../context/AppContext";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <ChakraProvider theme={theme}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ChakraProvider>
    </NextUIProvider>
  );
}
