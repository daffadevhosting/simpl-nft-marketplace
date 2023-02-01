import {
  useNetwork,
  useNetworkMismatch,
  ThirdwebNftMedia,
  useAddress,
  useTokenBalance,
  useOwnedNFTs,
  useContract,
  useMetamask, useWalletConnect, useCoinbaseWallet,
} from "@thirdweb-dev/react";
import {
  Box,
  Link,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Menu,
  MenuItem,
  MenuDivider,
  useToast,
  Flex,
  Tag,
  Spinner,
  Avatar,
  Center,
  Image,
  SimpleGrid, Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useContext, useRef, useEffect, useState } from "react";
import { NFT_COLLECTION_ADDRESS, TOKEN_REWARD_ADDRESS, MEMBERPASS_CONTRACT_ADDRESS, NFT_STAKING_ADDRESS } from "../const/contractAddresses";
import { ChainName, swapUrl, tokenExplorer } from "../const/aLinks";
import Loading from "../components/Spinner";
import MintMember from "../components/Member";
import LoginModal from "../components/Login";
import Footer from "../components/Footer";
import WarnPage from "../components/Warning";
import css from "../styles/css.module.scss";

const nftCollection = NFT_COLLECTION_ADDRESS;
const tokenContractAddress = TOKEN_REWARD_ADDRESS;
const stakingContractAddress = NFT_STAKING_ADDRESS;

const network = ChainName;
const ava = '/icons/mining-icon.png';
const Logo = '/icons/pancakeswap.png';
const FaBsc = '/icons/bscscan-logo.svg';
const swap = swapUrl;

const Stake: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  // Wallet Connection Hooks
  const address = useAddress();
  const router = useRouter();

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const color = useColorModeValue('gray.800', 'gray.300');
  const bgColor = useColorModeValue('white', 'gray.800');
  const btnColor = useColorModeValue('#151f21', 'gray.900');
  
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();

  
  const { contract: editionDrop } = useContract(
    MEMBERPASS_CONTRACT_ADDRESS,
    "edition-drop"
  );

  // Contract Hooks
  const { contract: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    "nft-collection"
  );

  const { contract: tokenContract } = useContract(
    TOKEN_REWARD_ADDRESS,
    "token"
  );

  const { contract } = useContract(stakingContractAddress);

  // Load Unstaked NFTs
  const { data: ownedNfts } = useOwnedNFTs(nftCollection, address);

  // Load Balance of Token
  const { data: tokenReward } = useTokenBalance(tokenContract, address);

  const [stakedNfts, setStakedNfts] = useState<any[]>([]);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  useEffect(() => {
    if (!contract) return;

    async function loadStakedNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      const stakedNfts = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const nft = await nftCollection?.get(stakedToken.tokenId);
            return nft;
          }
        )
      );

      setStakedNfts(stakedNfts);
      console.log("setStakedNfts", stakedNfts);
    }

    if (address) {
      loadStakedNfts();
    }
  }, [address, contract, nftCollection]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const cr = await contract?.call("availableRewards", address);
      console.log("Loaded claimable rewards", cr);
      setClaimableRewards(cr);
    }

    loadClaimableRewards();
  }, [address, contract]);

  const {
    data: memberNfts,
    isLoading,
    isError,
  } = useOwnedNFTs(editionDrop, address);

  if (!address) {
    return (
<>
<WarnPage />
<LoginModal />
</>
    );
  }

  // 1. Loading
  if (!memberNfts || isLoading) {
    return 
		  <div className={css.loadingOrError}>
		  <Loading />
          </div>;
  }
  
  // Something went wrong
  if (!memberNfts || isError) {
    return <div className={css.loading}>Error...!</div>;
  }

  // 2. No NFTs - mint page
  if (memberNfts.length === 0 || networkMismatch) {
    return (
<>
        <MintMember />
</>
    );
  }

  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftCollection?.isApproved(
      address,
      stakingContractAddress
    );
    // If not approved, request approval
    if (!isApproved) {
      await nftCollection?.setApprovalForAll(stakingContractAddress, true);
    }
    const stake = await contract?.call("stake", id);
  }

  async function withdraw(id: BigNumber) {
    const withdraw = await contract?.call("withdraw", id);
  }

  async function claimRewards() {
    const claim = await contract?.call("claimRewards");
  }

  if (!isLoading) {
		  <div className={css.loadingOrError}>
		  <Loading />
          </div>;
  }

  return (
<>
    <div className={css.StakeContainer}>

      {!address ? (
<>
<WarnPage />
<LoginModal />
</>
      ) : (
        <>
    <Container maxW={'5xl'} py={20} pb={-20}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginBottom={{ base: 20, md: 0 }}>
    <Center py={6}>
      <Box
        maxW={'100%'}
        w={'full'}
        bg={bgColor}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        alt=""
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={ava}
            style={{
              border: '2px solid white',
            }}
          />
        </Flex>
          <Flex position={'absolute'} alignItems={'center'} top={20} ml={3}>
            <Stack direction={'row'} spacing={5}>
              <Button bg={btnColor}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
  <Link href={swapUrl()} target="_blank" rel="noopener noreferrer" title="pancakeswap" style={{height: 28,}}>
				<Image src={Logo} style={{width: 28, height: 28}} width={28} height={28} alt="logo" /></Link>
              </Button>
              <Button bg={btnColor}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
  <Link href={tokenExplorer()} target="_blank" rel="noopener noreferrer" title="Token Scan" style={{height: 28,}}>
				<Image src={FaBsc} style={{width: 28, height: 28}} width={28} height={28} alt="logo" /></Link>
              </Button>
            </Stack>
          </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {tokenReward?.symbol} Token
            </Heading>
            <Text color={'gray.500'}>Staking Reward</Text>
          </Stack>

          <Stack direction={{ md: 'column', base: 'column'}} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Balance
              </Text>
              <Text fontWeight={600}>
                <b>{tokenReward?.displayValue}</b> {tokenReward?.symbol}</Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Claimable
              </Text>
              <Text fontWeight={600}>
                <b>
                  {!claimableRewards
                    ? "Claiming..."
                    : ethers.utils.formatUnits(claimableRewards, 18)}
                </b>{" "}
                {tokenReward?.symbol}</Text>
            </Stack>
          </Stack>

          <Button
            onClick={() => claimRewards()}
            w={'full'}
            mt={8}
            bg={btnColor}
			color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            Claim Rewards 
          </Button>
        </Box>
      </Box>
    </Center>
	
      <Box my={6}
        maxW={'100%'}
        w={'full'}
        bg={bgColor}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
<Tabs isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab>Your Unstaked NFTs</Tab>
    <Tab>Your Staked NFTs</Tab>
  </TabList>
  <TabPanels>
    <TabPanel className={css.maxH}>
			<div className={css.stakingGrid}>
            {ownedNfts?.map((nft) => (
              <div className={css.nftStakeBox} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={css.nftStakeMedia}
                />
                <Button
			w={'full'}
            mt={'12px'}
            bg={btnColor}
			color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}	
                  onClick={() => stakeNft(nft.metadata.id)}
                >
                  Stake
                </Button>
              </div>
            ))}
			</div>
    </TabPanel>
    <TabPanel className={css.maxH}>
			<div className={css.stakingGrid}>
            {stakedNfts?.map((nft) => (
              <div className={css.nftStakeBox} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={css.nftStakeMedia}
                />
                <Button
			w={'full'}
            mt={'12px'}
            bg={btnColor}
			color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
                  onClick={() => withdraw(nft.metadata.id)}
                >
                  Withdraw
                </Button>
              </div>
            ))}
			</div>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
      </SimpleGrid>
    </Container>
        </>
      )}
    </div>
      <Footer />
</>
  );
};

export default Stake;

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
