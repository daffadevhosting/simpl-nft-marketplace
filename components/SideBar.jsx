import React, { useRef, ReactNode } from 'react';
import {
  chakra,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton, Input, useDisclosure, Button, Flex, Box,
  Text, Link,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FiMenu, } from 'react-icons/fi';
import { RiUpload2Fill, RiHandCoinLine, RiRefundFill, RiHome2Line, RiDropLine } from 'react-icons/ri';
import Image from 'next/image';
import { useRouter } from "next/router";
import { stakeUrl, uploadUrl, resellUrl, marketUrl, dropUrl } from "../const/navLink";
import css from "../styles/css.module.css";

const home = marketUrl;
const stake = stakeUrl;
const upload = uploadUrl;
const resell = resellUrl;
const nftdrop = dropUrl;

const Title = 'SimPL NFT';

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <Text>{label}</Text>
      {children}
    </chakra.button>
  );
};

export default function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef();
  const router = useRouter();

  function homeClick() {
    router.push("/");
  }

  return (
    <>
        <Flex h={16} alignItems={'center'} gap={3} justifyContent={'space-between'}>
<div className={css.mobile_only}>
      <IconButton
        ref={btnRef}
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
</div>
          <Box onClick={homeClick} cursor={'pointer'} fontSize={'lg'} fontWeight={700}>{Title}</Box>
</Flex>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Feature</DrawerHeader>

          <DrawerBody>
<Box>
        <Stack direction={'column'} spacing={6}>
          <Link className={`${css.linkButton} ${router.pathname == "/" ? "active" : ""}`} label={'Home'} href={'/'}>
<Flex alignItems={'center'} justifyContent={'space-between'}>
<Text> Home </Text>
            <RiHome2Line />
</Flex>
          </Link>
          <Link className={`${css.linkButton} ${router.pathname == "/staking" ? "active" : ""}`} label={'Stake'} href={stake()}>
<Flex alignItems={'center'} justifyContent={'space-between'}>
<Text> Stake NFTs </Text>
            <RiHandCoinLine />
</Flex>
          </Link>
          <Link className={`${css.linkButton} ${router.pathname == "/upload" ? "active" : ""}`} label={'Upload NFT'} href={upload()}>
<Flex alignItems={'center'} justifyContent={'space-between'}>
<Text> Upload NFTs </Text>
            <RiUpload2Fill />
</Flex>
          </Link>
          <Link className={`${css.linkButton} ${router.pathname == "/resell" ? "active" : ""}`} label={'Resell'} href={resell()}>
<Flex alignItems={'center'} justifyContent={'space-between'}>
<Text> Resell NFTs </Text>
            <RiRefundFill />
</Flex>
          </Link>
          <Link className={`${css.linkButton} ${router.pathname == "/nftdrop" ? "active" : ""}`} label={'Air Drop'} href={nftdrop()}>
<Flex alignItems={'center'} justifyContent={'space-between'}>
<Text> AirDrop NFT </Text>
            <RiDropLine />
</Flex>
          </Link>
        </Stack>
</Box>
          </DrawerBody>

          <DrawerFooter>
<Text>
  SimPL Marketplace, design by{' '}
  <Link color='teal.500' href='https://github.com/daffadevhosting/simpl-nft-marketplace' isExternal>
    unangningEU
  </Link>
</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
