import React from "react";
import Head from 'next/head';
import { Box, Heading, Text } from '@chakra-ui/react';
import AirConst from "../components/Airdrop";
import { WarningTwoIcon } from '@chakra-ui/icons';
import css from "../styles/css.module.css";


const NftDrop = () => (
  <>
    <Head>
      <title>SimPL AirDrop</title>
    </Head>
<div className={css.drop}>
    <AirConst />
</div>
  </>
)

export default NftDrop
