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
import { RiWallet3Line, RiUpload2Line, RiRefundFill } from "react-icons/ri";
import css from "../styles/css.module.scss";

interface StatsCardProps {
  title: string;
  stat: string;
  icon?: ReactElement;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat className={css.glassBackground}
      px={{ base: 4, md: 8 }}
      py={'5'}
      color={'#1a202c'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'lg'} fontSize={'2xl'} display={'flex'} alignItems={'center'} flexDirection={'column'} isTruncated>
        {title}
        <div>{icon}</div>
      </StatLabel>
      <StatNumber fontSize={'1xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
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
        <StatsCard icon={<RiWallet3Line size={56}/>} title={'Connect Wallet'} stat={'Connect your wallet for interact with website to try all feature'} />
        <StatsCard icon={<RiUpload2Line size={56}/>} title={'Upload NFT'} stat={'Upload your NFTs and set a title, description and price.'} />
        <StatsCard icon={<RiRefundFill size={56}/>} title={'List for sale'} stat={'Earn tBNB for all your NFTs that you sell on our marketplace.'} />
      </SimpleGrid>
    </Box>
  );
}
