import "~~/styles/globals.css";

import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";

import "@rainbow-me/rainbowkit/styles.css";
import { appChains } from "~~/services/web3/wagmiConnectors";
import { wagmiClient } from "~~/services/web3/wagmiClient";
import Header from "~~/components/Header";
import Navbar from "~~/components/Navbar";
import Footer from "~~/components/Footer";

import { useEffect } from "react";
import { useAppStore } from "~~/services/store/store";
import { useEthPrice } from "~~/hooks/scaffold-eth";

import NextNProgress from "nextjs-progressbar";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useEthPrice();
  const setEthPrice = useAppStore(state => state.ethPriceSlice.setEthPrice);

  useEffect(() => {
    if (price > 0) {
      setEthPrice(price);
    }
  }, [setEthPrice, price]);

  return (
    <WagmiConfig client={wagmiClient}>
      <NextNProgress />
      <RainbowKitProvider chains={appChains.chains}>
        <ChakraProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Head>
              <title>CoffeeTown</title>
              <meta name="description" content="Get support from your audience in crypto" />
            </Head>
            <main className="flex flex-col flex-1">
              <Component {...pageProps} />
            </main>
            {/* <Footer /> */}
          </div>
        </ChakraProvider>

        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
