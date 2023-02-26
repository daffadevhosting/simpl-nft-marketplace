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
    <Flex className={`${css.bannerContaint} ${css.bgMove}`}
      position={'fixed'}
      w={'full'}
      h={{ base: '30vh', md: '90vh' }}
      backgroundImage={
        'url(./stars.png)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      top={'64px'}>
      <VStack style={{ backgroundImage: 'none' }}
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack className={css.bannerText} maxW={'2xl'} align={'center'} spacing={6}>
          <Text className={css.slideInLeft}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              {contractMetadata?.name}
          </Text>
              <Text className={css.slideInRight}>{contractMetadata?.description}</Text>
        </Stack>
      </VStack>
    </Flex>
  );
}
