import {
  Box,
  Icon,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { RiHandCoinLine, RiUpload2Line, RiRefundFill } from "react-icons/ri";
import css from "../styles/css.module.css";

interface StatsCardProps {
  title: string;
  stat: string;
  icon?: ReactElement;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
<div className={css.glassBox} data-tilt data-tilt-max="10" data-tilt-speed="200" data-tilt-glare="true" data-tilt-gyroscope="true">
    <Stat className={css.cardBox}
      px={{ base: 4, md: 8 }}
      py={'5'}>
        <div className={css.iconBox}>{icon}</div>
      <StatLabel className={css.labelStat} pointerEvents={'none'} fontWeight={'lg'} fontSize={'2xl'} display={'flex'} alignItems={'center'} flexDirection={'column'} isTruncated>
        {title}
      </StatLabel>
      <StatLabel fontSize={'1xl'} fontWeight={'medium'} pointerEvents={'none'}>
        {stat}
      </StatLabel>
    </Stat>
</div>
  );
}

export default function HowTo() {
  return (
    <Box mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}>
        What can you do on website?
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} mt={{ base: 0, md: 65 }}>
        <StatsCard icon={<RiHandCoinLine size={56}/>} title={'Staking NFT'} stat={'Stake your NFT at tBNB testnet and earn reward token from it.'} />
        <StatsCard icon={<RiUpload2Line size={56}/>} title={'Upload NFT'} stat={'Upload your NFTs and set a title, description and price.'} />
        <StatsCard icon={<RiRefundFill size={56}/>} title={'List for sale'} stat={'Earn tBNB for all your NFTs that you sell on our marketplace.'} />
      </SimpleGrid>
    </Box>
  );
}
