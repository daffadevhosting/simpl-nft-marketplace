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
  Container
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
  // Next JS Router hook to redirect to other pages
  const router = useRouter();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const [creatingListing, setCreatingListing] = useState(false);

  // Connect to our marketplace contract via the useContract hook
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS, // Your marketplace contract address here
    "marketplace"
  );

  // This function gets called when the form is submitted.
  async function handleCreateListing(e: any) {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork?.(activeChainId);
        return;
      }

      // Prevent page from refreshing
      e.preventDefault();

      // Store the result of either the direct listing creation or the auction listing creation
      let transactionResult: undefined | TransactionResult = undefined;

      // De-construct data from form submission
      const { listingType, contractAddress, tokenId, price } =
        e.target.elements;

      // Depending on the type of listing selected, call the appropriate function
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

      // If the transaction succeeds, take the user back to the homepage to view their listing!
      if (transactionResult) {
        router.push(`/`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createAuctionListing(
    contractAddress: string,
    tokenId: string,
    price: string
  ) {
    try {
      const transaction = await marketplace?.auction.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        reservePricePerToken: 0, // Minimum price, users cannot bid below this amount
        startTimestamp: new Date(), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
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
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
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
                }}
          >
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
