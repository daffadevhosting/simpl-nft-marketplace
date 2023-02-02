import React, { useState } from "react";
import {
  useContract,
  useNetwork,
  useNetworkMismatch,
  useAddress,
} from "@thirdweb-dev/react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container,
  useToast
} from '@chakra-ui/react';
import {
  ChainId,
  NATIVE_TOKEN_ADDRESS,
  TransactionResult,
} from "@thirdweb-dev/sdk";
import Image from 'next/image';
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { openseaUrl } from "../const/aLinks";
import Footer from "../components/Footer";
import css from "../styles/css.module.scss";

const activeChainId = parseInt(`${process.env.NEXT_PUBLIC_CHAIN_ID}`)
const openseaLink = openseaUrl;
const Logo = "/icons/opensea.svg"

const Resell: NextPage = () => {
  const address = useAddress();
  const alert = useToast();

  const router = useRouter();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const [creatingListing, setCreatingListing] = useState(false);

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace"
  );

  async function handleCreateListing(e: any) {
    setCreatingListing(true);
    try {
      if (networkMismatch) {
        switchNetwork?.(activeChainId);
        return;
      }

      e.preventDefault();

      let transactionResult: undefined | TransactionResult = undefined;

      const { listingType, contractAddress, tokenId, price } =
        e.target.elements;

      // For Direct Listings:
      if (listingType.value === "directListing") {
        transactionResult = await createDirectListing(
          contractAddress.value,
          tokenId.value,
          price.value
        );
      }

      // For Auction Listings:
      if (listingType.value === "auctionListing") {
        transactionResult = await createAuctionListing(
          contractAddress.value,
          tokenId.value,
          price.value
        );
      }

      if (transactionResult) {
              alert({
                  title: 'Success.',
                  description: "Listing NFT berhasil...",
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
        router.push(`/`);
      }
    } catch (error) {
      alert({
          title: 'Listing Gagal.',
          description: "Listing NFT gagal. Check the console for more details",
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
    } finally {
      setCreatingListing(false);
    }
  }

  async function createAuctionListing(
    contractAddress: string,
    tokenId: string,
    price: string
  ) {
    try {
      const transaction = await marketplace?.auction.createListing({
        assetContractAddress: contractAddress,
        buyoutPricePerToken: price,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        listingDurationInSeconds: 60 * 60 * 24 * 7,
        quantity: 1,
        reservePricePerToken: 0,
        startTimestamp: new Date(),
        tokenId: tokenId,
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  async function createDirectListing(
    contractAddress: string,
    tokenId: string,
    price: string
  ) {
    try {
      const transaction = await marketplace?.direct.createListing({
        assetContractAddress: contractAddress,
        buyoutPricePerToken: price,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        listingDurationInSeconds: 60 * 60 * 24 * 7,
        quantity: 1,
        startTimestamp: new Date(0),
        tokenId: tokenId,
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  return (
<>
    <form onSubmit={(e) => handleCreateListing(e)}>
    <Flex
      mt={{ base: 10, md: 10 }}
      minH={{ base: '83vh', md: '95vh' }}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} px={1}>
          <Heading fontSize={'2xl'}>
            Resell your NFT to marketplace</Heading>
          <Text fontSize={'lg'} color={'gray.600'} mt={'0px'} className={css.flexCenter}>
            You can also list on <Link href={openseaLink()} color={'blue.400'} target="_blank" rel="noopener noreferrer" title="OpenSea">OPENSEA <Image src={Logo} width={18} height={18} alt="opensea" /></Link>
          </Text>
        <Box style={{marginTop: '10px', zIndex: 0}}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="contractAddress" isRequired>
              <FormLabel>NFT Contract</FormLabel>
              <input
            className={css.textInput}
            type="text"
            name="contractAddress"
            placeholder="NFT Contract Address" />
            </FormControl>
            <FormControl id="tokenId" isRequired>
              <FormLabel>NFT Token ID</FormLabel>
              <input
            className={css.textInput}
            type="text"
            name="tokenId"
            placeholder="NFT Token ID" />
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel>Sale Price</FormLabel>
          <input
            className={css.textInput}
            type="text"
            name="price"
            placeholder="Sale Price in BNB"
          />
            </FormControl>

          {/* Toggle between direct listing and auction listing */}
          <div className={css.none}>
            <input
              type="radio"
              name="listingType"
              id="directListing"
              value="directListing"
              defaultChecked
              className={css.listingType}
            />
            <label htmlFor="directListing" className={css.listingTypeLabel}>
              Direct Listing
            </label>
            <input
              type="radio"
              name="listingType"
              id="auctionListing"
              value="auctionListing"
              className={css.listingType}
            />
            <label htmlFor="auctionListing" className={css.listingTypeLabel}>
              Auction Listing
            </label>
          </div>
		  
            <Stack spacing={10}>
        {address ? (
          <Button 
				style={{marginTop: '10px'}}
				type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500'
                }} isLoading={creatingListing} loadingText='Transaction' spinnerPlacement='start'>
{networkMismatch ? (
<>
Switch Network
</>
) : (
<>
           List NFT
			</>
)}
          </Button >
          ) : (
          <Button
			colorScheme={'red'}
            style={{ marginTop: 3, borderStyle: "none" }}
			disabled> Connect Wallet
          </Button >
		)}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </form>
      <Footer />
</>
  );
};

export default Resell;
