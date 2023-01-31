import {
  ThirdwebNftMedia,
  useAddress,
  useNetwork,
  useNetworkMismatch,
  useClaimNFT,
  useActiveClaimCondition,
  useContract,
  useNFT
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button,
  Link,
  useToast,
} from '@chakra-ui/react';
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
  IoSwapHorizontalOutline
} from 'react-icons/io5';
import { RiSignalWifiErrorLine } from "react-icons/ri";
import React, { useContext, useState, ReactElement } from 'react';
import { MEMBERPASS_CONTRACT_ADDRESS, MEMBER_CARD_PRICE } from "../const/contractAddresses";
import { ChainName, memberUrl } from "../const/aLinks";
import Footer from "../components/Footer";
import css from "../styles/css.module.scss";

  const IMAGE = './simpl.png';
  const Logo = "/icons/opensea.svg"
  const price = MEMBER_CARD_PRICE
  const tokenId = 0;
  const network = ChainName();

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Member() {
  const { contract: editionDrop } = useContract(MEMBERPASS_CONTRACT_ADDRESS);
  const { mutate: claim, isLoading } = useClaimNFT(editionDrop);
  const address = useAddress();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  
  const alert = useToast();
  
  const { data: nftMetadata } = useNFT(editionDrop, tokenId);

  const { data: activeClaimCondition } = useActiveClaimCondition(
    editionDrop,
    BigNumber.from(tokenId)
  );

const bgBlue = useColorModeValue('blue.50', 'blue.900');
const bgColor = useColorModeValue('white', 'gray.800');

  
  async function mint() {
    try {
      claim(
        {
            quantity: 1,
            to: address as string,
            tokenId: 0,
          },
        {
          onSuccess: (data) => {
            alert({
          title: 'Success.',
          description: "Kartu Member Berhasil di Claim.",
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
          },
          onError: (error) => {
            const e = error;
            alert({
              title: 'Gagal Claim Member...',
			  description: "Member claim, Gagal.",
			  status: 'error',
			  duration: 6000,
			  isClosable: true,
            });
          },
        }
      );
    } catch (error) {
            alert({
              title: 'Error Unknown',
			  status: 'error',
			  duration: 6000,
			  isClosable: true,
            });
        }
  }

  return (
<>
    <Container maxW={'8xl'} py={{ base: 6, md: 12 }} mt={{ base: 6, md: 0 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={'8'} maxW={1250}ml={'auto'} mr={'auto'}>
        <Flex justify={'center'} bg={'blueviolet'} overflow={'hidden'} borderRadius={'6'}>
          <Image
            h={500}
            maxW={'auto'}
            rounded={'md'}
            alt={'feature image'}
            src={IMAGE}
            objectFit={'cover'}
            zIndex={0}
            transform={{ base: 'matrix(0.99, 0.15, -0.15, 0.99, 0, 0);', md: 'matrix(0.99, -0.15, 0.15, 0.99, 0, 0);' }}
          />
          <Image
            className={css.miring}
            h={500}
            maxW={'auto'}
            rounded={'md'}
            alt={'feature image'}
            src={IMAGE}
            objectFit={'cover'}
            _hover={{
            transform: 'matrix(0.99, 0.15, -0.15, 0.99, 0, 0) scale(1.3)',
            transition: 'all .8s ease'
                    }}
          />
        </Flex>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={bgBlue}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Member Only
          </Text>
          <Heading>Stake Your NFT for Passive Income</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            For staking your NFT, claim a member card to open the staking page and claim the reward token.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Passive Income'}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Get Rewards'}
            />
            <Feature
              icon={
                <Icon as={IoSwapHorizontalOutline} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Swap on Market'}
            />
{networkMismatch ? (
            <Button leftIcon={<RiSignalWifiErrorLine />}
               maxW={'200'} w={200} alignSelf={'flex-end'}
              color={'white'}
              bg={'red'}
              _hover={{ 
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
              bg: 'red.600' }}
              onClick={() => switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID))}>
Switch to {network}
            </Button>
) : (
            <Button maxW={'200'} w={200} alignSelf={'flex-end'}
            bg={'blue'} color={'white'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
              bg: 'blue.500',
            }}
            onClick={() =>
              mint()
            }>Claim {price}</Button>
)}
          </Stack>
<Link href={memberUrl()} className={css.linkOpnsi} color={'blue.400'} target="_blank" rel="noopener noreferrer" title="OpenSea">OPENSEA <Image src={Logo} width={18} height={18} alt="opensea" /></Link>
        </Stack>
      </SimpleGrid>
    </Container>
      <Footer />
</>
  );
}
