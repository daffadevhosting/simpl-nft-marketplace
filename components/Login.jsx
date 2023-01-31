import { useAddress, useDisconnect,
  useMetamask, useWalletConnect, useCoinbaseWallet,
  useNetwork,
  useNetworkMismatch, } from "@thirdweb-dev/react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  Heading, Tooltip,
  Image, Wrap, WrapItem,
  Text, Center, SimpleGrid, Box,
  Card, CardHeader, CardBody, CardFooter
} from '@chakra-ui/react'
import Link from "next/link";
import React from "react";
import css from "../styles/css.module.scss";
import { RiSignalWifiErrorLine } from "react-icons/ri";
import { ChainName } from "../const/aLinks";

  const network = ChainName();

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const address = useAddress();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnectWallet = useDisconnect();

  return (
<>
        {address ? (
<>
{networkMismatch ? (
<div className={css.fixed}>
<Tooltip hasArrow className={css.pulse} label='Website is interact at Binance Testnet, Click To Switch Your Network' bg='gray.300' color='black'>
                  <Button leftIcon={<RiSignalWifiErrorLine />} onClick={() => switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID))} colorScheme={'red'}>Switch Network</Button>
</Tooltip>
</div>
) : (<></>)}
</>
          ) : (
<>
<div className={css.fixed}>
<Tooltip hasArrow className={css.pulse} label='Sign Your Wallet' bg='red' color='white'>
      <Button colorScheme='blue' onClick={onOpen}>
        Connect Wallet
      </Button>
</Tooltip>
</div>
      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen} size={'full'}>
        <DrawerOverlay />
        <DrawerContent bg={'#00000066'}>
          <DrawerCloseButton />
          <DrawerBody>
<Center className={css.center}>
<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  className={css.maxWidth}
  h={{ base: '100%', sm: '350px' }}
>
  <Image
    objectFit='cover'
    w={{ base: '100%', sm: '250px' }}
    src='https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2021/10/22005930/Crypto-Wallet-Development-Solution.svg'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody w={{ base: '100%', sm: '350px' }}>
      <Heading size='md' mb='4'>Connect your wallet</Heading>
<SimpleGrid columns={2} spacingX='8px' spacingY='8px' h={{ base: '260px', sm: '100%'}}>
<div>
  <Box className={css.metamask} height='100px' onClick={ () => { connectWithMetamask();  onClose();}}
            _hover={{
              transform: 'translateY(-4px)',
            }}></Box>
  <Text fontWeight={600}>Metamask</Text>
</div>
<div>
  <Box className={css.walletconnect} height='100px' onClick={ () => { connectWithWalletConnect();  onClose();}}
            _hover={{
              transform: 'translateY(-4px)',
            }}></Box>
  <Text fontWeight={600}>Wallet Connect</Text>
</div>
<div>
  <Box className={css.coinbase} height='100px' onClick={ () => { connectWithCoinbaseWallet();  onClose();}}
            _hover={{
              transform: 'translateY(-4px)',
            }}></Box>
  <Text fontWeight={600}>Coinbase</Text>
</div>
</SimpleGrid>
    </CardBody>
  </Stack>
</Card>
</Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
</>
		)}
</>
  );
}
