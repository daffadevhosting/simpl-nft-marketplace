import {
  useAddress,
  useDisconnect,
  useMetamask, useWalletConnect, useCoinbaseWallet,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  VStack,
  useColorMode,
  Center,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from "next/router";
import React, { useContext, useRef, useEffect } from "react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { openseaUrl, walletscanUrl } from "../const/aLinks";
import { RiLoginCircleFill, RiWallet3Fill, RiShieldUserFill, RiSignalWifiErrorLine, RiUpload2Fill, RiHandCoinLine, RiRefundFill, RiHome2Line, RiDropLine } from "react-icons/ri";
import { FiChevronDown, } from 'react-icons/fi';
import SideMenu from './SideBar';
import { stakeUrl, uploadUrl, resellUrl, marketUrl, dropUrl } from "../const/navLink";
import css from "../styles/css.module.css";

const Title = 'SimPL';
const openseaLink = openseaUrl;
const scanUrl = walletscanUrl;
const Logo = "/icons/opensea.svg";

const NavLink = ({ children }, { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);


export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const address = useAddress();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  
  const color = useColorModeValue('gray.200', 'gray.700');
  
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnectWallet = useDisconnect();

const home = marketUrl;
const stake = stakeUrl;
const upload = uploadUrl;
const resell = resellUrl;
const nftdrop = dropUrl;

  function homeClick() {
    router.push("/");
  }
  
  return (
    <>
      <Box bg={'backdrop-filter: blur(5px); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);'} px={4} style={{position: 'fixed', width: '100%', top: 0}}zIndex={1}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
<SideMenu />

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
<div className={css.desktop_only} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
<Tooltip hasArrow className={css.pulse} label='Home' bg='blue.600' color='white' placement='bottom'>
<Link className={`${router.pathname == "/" ? "active" : ""}`} label={'Home'} href={'/'}>
<Button>
    <RiHome2Line size='20' />
</Button>
</Link>
</Tooltip>
<Tooltip hasArrow className={css.pulse} label='Stake NFT' bg='blue.600' color='white' placement='bottom'>
<Link className={`${router.pathname == "/staking" ? "active" : ""}`} label={'Stake'} href={stake()}>
<Button>
    <RiHandCoinLine size='20' />
</Button>
</Link>
</Tooltip>
<Tooltip hasArrow className={css.pulse} label='Upload NFT' bg='blue.600' color='white' placement='bottom'>
<Link className={`${router.pathname == "/upload" ? "active" : ""}`} label={'Upload NFT'} href={upload()}>
<Button>
    <RiUpload2Fill size='20' />
</Button>
</Link>
</Tooltip>
<Tooltip hasArrow className={css.pulse} label='Resell NFT' bg='blue.600' color='white' placement='bottom'>
<Link className={`${router.pathname == "/resell" ? "active" : ""}`} label={'Resell'} href={resell()}>
<Button>
    <RiRefundFill size='20' />
</Button>
</Link>
</Tooltip>
<Tooltip hasArrow className={css.pulse} label='NFT Airdrop' bg='blue.600' color='white' placement='bottom'>
<Link className={`${router.pathname == "/nftdrop" ? "active" : ""}`} label={'Air Drop'} href={nftdrop()}>
<Button>
    <RiDropLine size='20' />
</Button>
</Link>
</Tooltip>
</div>
<div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '10px 0' }}>
  <Link href={openseaLink()} target="_blank" rel="noopener noreferrer" title="OpenSea" style={{height: 30,}}>
				<Image src={Logo} width={30} height={30} alt="logo" />
 </Link>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon size={32} /> : <SunIcon size={32} />}
              </Button>
</div>

              <Menu>
    <>
        {address ? (
		<>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black-thumbnail.png'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <span style={{color: 'white'}}>{address.slice(0, 3).concat("").concat(address.slice(-4))}</span>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown color={'white'} />
                </Box>
              </HStack>
            </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <RiWallet3Fill
                      size={60}
                    />
                  </Center>
                  <br />
                  <Center>
					<Link href={scanUrl()} target="_blank" rel="noopener noreferrer" title="Wallet Scan" style={{height: 28,}}>
                    <p>{address.slice(0, 3).concat("").concat(address.slice(-4))}</p>
					</Link>
                  </Center>
                  <MenuDivider />
                  <Center>
					<Link href={"https://testnet.bnbchain.org/faucet-smart"} target="_blank" rel="noopener noreferrer" title="BNB faucet">tBNB Faucet</Link>
                  </Center>
                  <MenuDivider />
{networkMismatch ? (
<>
                  <MenuItem leftIcon={<RiSignalWifiErrorLine />} onClick={() => switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID))} colorScheme={'blue'}>Switch Network</MenuItem>
</>
) : (
<>
                  <MenuItem onClick={() => {disconnectWallet(), homeClick(), toast({
          title: 'Wallet Disconnect.',
          description: "Wallet has been disconnected..",
          status: 'info',
          duration: 3000,
          isClosable: true,
        })}
				  }>Logout</MenuItem>
</>
)}
                </MenuList>
	  </>
          ) : (
		  <>
		  </>
		)}
    </>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
