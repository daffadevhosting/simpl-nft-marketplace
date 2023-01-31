import * as React from 'react'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head'
import Header from "../components/Navbar";
import "../styles/globals.css";

const activeChainId =  parseInt(`${process.env.NEXT_PUBLIC_CHAIN_ID}`);
const Title = 'Simple Marketplace';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
    <ChakraProvider>
      <Head>
        <title>{Title}</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
