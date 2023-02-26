import {
  useContract,
  useActiveListings,
  useContractMetadata,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import css from "../styles/css.module.css";

export default function Banner() {
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS);
  const { data: listings, isLoading } = useActiveListings(marketplace);
  // Load contract metadata
  const { data: contractMetadata, isLoading: loadingMetadata } =
    useContractMetadata(marketplace);
  return (
    <Flex className={`${css.bannerContaint} ${css.starSection}`}
      position={'fixed'}
      w={'full'}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      top={'64px'}>
      <VStack
        w={'full'}
        justify={'center'}>
            <div className={`${css.star} ${css.star1}`}></div>
            <div className={`${css.star} ${css.star2}`}></div>
            <div className={`${css.star} ${css.star3}`}></div>
            <div className={`${css.star} ${css.star4}`}></div>
            <div className={`${css.star} ${css.star5}`}></div>
            <div className={`${css.star} ${css.star6}`}></div>
            <div className={`${css.star} ${css.star7}`}></div>
            <div className={`${css.star} ${css.star8}`}></div>
        <Stack className={css.bannerText} maxW={'2xl'} align={'center'} spacing={6}>
          <Text className={css.slideInLeft}
            fontWeight={700}
            lineHeight={1.5}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              {contractMetadata?.name}
          </Text>
              <Text className={css.slideInRight}>{contractMetadata?.description}</Text>
        </Stack>
      </VStack>
    </Flex>
  );
}
