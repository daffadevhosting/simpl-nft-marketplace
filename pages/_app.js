import * as React from 'react'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import Script from 'next/script';
import Header from "../components/Navbar";
import "../styles/globals.css";

const activeChainId =  parseInt(`${process.env.NEXT_PUBLIC_CHAIN_ID}`);
const Title = 'SimPL Marketplace';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
    <ChakraProvider>
      <Head>
        <title>{Title}</title>
<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/fav/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/icons/fav/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/icons/fav/favicon-16x16.png" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/icons/fav/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="/icons/fav/favicon.ico" />
<meta name="msapplication-TileColor" content="#2b5797" />
<meta name="msapplication-config" content="/icons/fav/browserconfig.xml" />
<meta name="theme-color" content="#262936" />
<meta property="og:type" content="website" />
<meta property="og:title" content="{Title}" />
<meta property="og:description" content="NFT Marketplace" />
<meta property="og:site_name" content="{Title}" />
<meta property="og:url" content="/" />
<meta property="og:image" content="/icons/fav/apple-touch-icon.png" />
      </Head>
      <Header />
<Script src="https://cdn.statically.io/gh/daffadevhosting/script/9e13c3721f597a707fd8dca50fc0701a9c621fdf/tilt.js" />
      <Component {...pageProps} />
    </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
