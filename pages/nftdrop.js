import React from "react";
import Head from 'next/head';
import { Box, Heading, Text } from '@chakra-ui/react';
import UnderConst from "../components/UnderCons";
import { WarningTwoIcon } from '@chakra-ui/icons';
import css from "../styles/css.module.scss";


const NftDrop = () => (
  <>
    <Head>
      <title>SimPL AirDrop</title>
    </Head>
<div className={css.loadingOrError}>
    <UnderConst />
</div>
  </>
)

export default NftDrop
