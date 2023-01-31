// pages/_document.js

import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../const/theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='id'>
    <Head>
<link rel="apple-touch-icon" sizes="180x180" href="/icons/fav/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/icons/fav/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/icons/fav/favicon-16x16.png" />
<link rel="manifest" href="/icons/fav/site.webmanifest" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/icons/fav/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="/icons/fav/favicon.ico" />
<meta name="msapplication-TileColor" content="#2b5797" />
<meta name="msapplication-config" content="/icons/fav/browserconfig.xml" />
<meta name="theme-color" content="#262936" />
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />
          <style>{`
            html, body, #__next {
              height: 100%;
            }
            #__next {
              margin: 0 auto;
            }
            h1 {
              text-align: center;
            }
            `}</style>
    </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
