import React, { useState } from "react";
import {
  Box,
  Center,
  Container,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Radio, RadioGroup
} from '@chakra-ui/react'
import {
  useContract,
  useActiveListings,
  useContractMetadata,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import css from "../styles/css.module.scss";
import LoginModal from "../components/Login"
import Banner from "../components/Banner";
import Loading from "../components/Spinner";
import Footer from "../components/Footer";

export default function Listings() {
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS);
  const { data: listings, isLoading } = useActiveListings(marketplace);

  // Load contract metadata
  const { data: contractMetadata, isLoading: loadingMetadata } =
    useContractMetadata(marketplace);

  const [filter, setFilter] = useState(0); // 0 = direct, auction = 1

  const colorBg = useColorModeValue('white', 'gray.800');

  return (
<>
    <div className={css.container}>
        <div className={css.bannerContainer}>
          {!loadingMetadata ? (
            <>
                <Banner />
            </>
          ) : (
            <>
            </>
          )}
        </div>

<Container maxW={'100%'}>
        {/* Toggle between direct listing and auction listing */}
        <div className={css.none}>
          <input
            type="radio"
            name="listingType"
            id="directListing"
            value="directListing"
            defaultChecked
            className={css.listingType}
            onClick={() => setFilter(0)}
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
            onClick={() => setFilter(1)}
          />
          <label htmlFor="auctionListing" className={css.listingTypeLabel}>
            Auction Listing
          </label>
        </div>

        {!isLoading ? (
<div className={ `${css.glassBackground} ${css.boxShadow}`}>
          <div className={ `${css.nftBoxGrid}` }>
            {listings
              ?.filter((listing) => listing.type === filter)
              ?.map((listing) => (
                <a
                  className={css.nftBox}
                  key={listing.id.toString()}
                  href={`/listing/${listing.id}`}
                >
      <Box
        role={'group'}
        p={{ base: 2, md: 6 }}
        maxW={'330px'}
        w={'full'}
        bg={colorBg}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={0}
                    _hover={{
                      transform: 'matrix(0.99, 0.12, -0.12, 0.99, 0, 0)',
                      boxShadow: 'lg',
                    }}>
        <Box
          rounded={'lg'}
          mt={{ base: '0', md: '-12'}}
          pos={'relative'}
          height={{ base: 'auto', md: 230 }}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${listing.asset.image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
                  <Image
                    src={`${listing.asset.image}`}
                    rounded={'lg'}
                    height={{ base: 140, md: 335 }}
                    width={282}
                    objectFit={'cover'}
                    metadata={{ ...listing.asset }}
                    alt='NFT listing'
                    className={css.nftList}
                  />
        </Box>
        <Stack pt={{ base: 6, md: 10 }} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            
          </Text>
          <Heading fontSize={'1xl'} fontFamily={'body'} fontWeight={500}>
            {listing.asset.name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                    {listing.buyoutCurrencyValuePerToken.symbol}
            </Text>
          </Stack>
        </Stack>
      </Box>
                </a>
              ))}
          </div>
</div>
        ) : (
        <>
          <div className={css.loadingOrError}><Loading /></div>
        </>
        )}
</Container>
<LoginModal />
    </div>
<Footer />
</>
  );
}