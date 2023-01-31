import {
  MediaRenderer,
  useContract,
  useNetwork,
  useNetworkMismatch,
  useListing, useAddress,
} from "@thirdweb-dev/react";
import { ChainId, ListingType, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "../../const/contractAddresses";
import {
  Container,
  Box,
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
  useToast,
  Spinner,
  Portal, Tooltip,
} from '@chakra-ui/react';
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from 'react-icons/io5';
import LoginModal from "../../components/Login";
import Loading from "../../components/Spinner";
import css from "../../styles/css.module.scss";
import React, { ReactElement, useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import { ChainName } from '../../const/aLinks';
import Footer from "../../components/Footer";

const activeChainId = parseInt(`${process.env.NEXT_PUBLIC_CHAIN_ID}`)
const contracAddress = NFT_COLLECTION_ADDRESS;
const contractType = 'ERC-721';
const networkName = ChainName();


export default function ListingPage() {
  const [copySuccess, setCopySuccess] = useState('');
  const TextRef = useRef(null);
  const alert = useToast();

  function copyToClipboard(e) {
    TextRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Berhasil di salin');
  };

  const address = useAddress();
  const router = useRouter();
  const { listingId } = router.query;
  const ref = React.useRef()

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const colorBg = useColorModeValue('red.50', 'red.900');
  const bordrColor = useColorModeValue('gray.100', 'gray.700');

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace"
  );
  const { data: listing, isLoading: loadingListing } = useListing(
    marketplace,
    listingId
  );

  if (listing?.secondsUntilEnd === 0) {
  }

  const [bidAmount, setBidAmount] = useState("");

  if (loadingListing) {
    return <div className={css.loadingOrError}><Loading /></div>;
  }

  if (!listing) {
    return <div className={css.loadingOrError}>Listing not found</div>;
  }

  async function createBidOrOffer() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork &&  switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID));
        return;
      }

      // If the listing type is a direct listing, then we can create an offer.
      if (listing?.type === ListingType.Direct) {
        await marketplace?.direct.makeOffer(
          listingId, // The listingId of the listing we want to make an offer for
          1, // Quantity = 1
          NATIVE_TOKENS[activeChainId].wrapped.address, // Wrapped Ether address on Goerli
          bidAmount // The offer amount the user entered
        );
      }

      // If the listing type is an auction listing, then we can create a bid.
      if (listing?.type === ListingType.Auction) {
        await marketplace?.auction.makeBid(listingId, bidAmount);
      }

      alert(
        `${
          listing?.type === ListingType.Auction ? "Bid" : "Offer"
        } created successfully!`
      );
    } catch (error) {
      console.error(error.message || "something went wrong");
      alert({
              title: 'ERROR',
			  description: "something went wrong.",
			  status: 'error',
			  duration: 6000,
			  isClosable: true,
            });
    }
  }

  async function buyNft() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID));
        return;
      }

      // Simple one-liner for buying the NFT
      await marketplace?.buyoutListing(listingId, 1);
      alert({
          title: 'Berhasil.',
          description: "Pembelian NFT Berhasil...",
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
              router.push(`/`);
    } catch (err) {
      console.error(err.message);
      alert({
              title: 'GAGAL',
			  description: "Pembelian NFT Gagal. Pastikan saldo mencukupi",
			  status: 'error',
			  duration: 6000,
			  isClosable: true,
            });
    }
  }
  return (
<>
    <Container maxW={'5xl'} py={12} mt={{ base: 8, md: 50 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex maxH={{ base: 361, md: 476 }} h={'100%'}>
          <MediaRenderer
            className={css.objectCover}
            src={listing.asset.image}
            objectFit={'cover'}
            alt={'NFT image'}
          />
        </Flex>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'red.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={colorBg}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Owned by <b>{listing.sellerAddress?.slice(0, 6)}</b>
          </Text>
          <Heading>{listing.asset.name}</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            {listing.asset.description}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={bordrColor}
              />
            }>
            <Text fontSize={'xl'}>
<b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}{listing.buyoutCurrencyValuePerToken.symbol}
</Text>
    <Box bg='white.400' textAlign='left' padding='10px' mt={0} className={css.portalW}>
      <Portal containerRef={ref}>
      </Portal>
      <Box ref={ref} bg={'whiteAlpha.500'} padding='10px' borderRadius='8px' boxShadow='2px 2px 10px -2px #000000a8'>
	  Detail:
          <Text fontSize={'sm'} style={{marginTop: '20px'}}>
             <b> ID token: {listing.asset.id}</b>
			 <br/>
<b> Type: {contractType}</b>
<br/>
<b> Chain: {networkName}</b>
		</Text>
      {
       document.queryCommandSupported('copy') &&
	   <div>
        <Text fontSize={'sm'}>
		  <b>Contract:</b>{" "}
          <Button onClick={copyToClipboard} variant={'link'} colorScheme={'blue'} title={'Salin'}> {contracAddress.slice(0, 4).concat("...").concat(contracAddress.slice(-4))}</Button> 
		</Text>
          {copySuccess}
        </div>
      }
      <form style={{position: 'fixed', bottom: '-9999px'}}>
        <input
		  style={{height: '0px'}}
          ref={TextRef}
          value='0x92143bb7e94d59D194d58422B30F7261901F9cad'
        />
      </form>
      </Box>
    </Box>
        {address ? (
            <Button w={200} bg={'blue.400'} alignSelf={'flex-end'}
              onClick={buyNft}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
              bg: 'blue.500',
            }}
            >
              Buy
            </Button>
        ) : (<>
<Tooltip  className={css.pulse} label='Your wallet not connected' bg='red' color='white'>
            <Button w={200} bg={'grey'} color={'white'} alignSelf={'flex-end'} fontWeight={600} p={2} rounded={'md'} isDisabled>
              Buy
            </Button>
</Tooltip>
            </>)}
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
<LoginModal />
      <Footer />
</>
  );
}
