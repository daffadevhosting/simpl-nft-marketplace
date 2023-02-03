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
  useToast 
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { openseaUrl, walletscanUrl } from "../const/aLinks";
import { RiLoginCircleFill, RiWallet3Fill, RiShieldUserFill, RiSignalWifiErrorLine } from "react-icons/ri";
import { FiChevronDown, } from 'react-icons/fi';
import SideMenu from './SideBar';
import { useMagic } from "@thirdweb-dev/react/evm/connectors/magic";

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
  const router = useRouter();
  const toast = useToast();
  const address = useAddress();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  
  const color = useColorModeValue('gray.200', 'gray.700');
  
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnectWallet = useDisconnect();

  function uploadClick() {
    router.push("/upload");
  }
  function homeClick() {
    router.push("/");
  }
  function sellingClick() {
    router.push("/resell");
  }
  function stakeClick() {
    router.push("/staking");
  }
  
  return (
    <>
      <Box bg={'#262936; backdrop-filter: blur(5px); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);'} px={4} style={{position: 'fixed', width: '100%', top: 0}}zIndex={1}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
<SideMenu />

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
<div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
              <Button>
  <Link href={openseaLink()} target="_blank" rel="noopener noreferrer" title="OpenSea" style={{height: 20,}}>
				<Image src={Logo} width={20} height={20} alt="logo" /></Link>
              </Button>
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
                  <MenuItem onClick={homeClick}>Marketplace</MenuItem>
                  <MenuItem onClick={stakeClick}>Stake NFT</MenuItem>
                  <MenuItem onClick={uploadClick}>Upload NFT</MenuItem>
                  <MenuItem onClick={sellingClick}>Resell NFT</MenuItem>
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
