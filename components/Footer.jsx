import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { ReactNode } from 'react';
import Image from 'next/image';
import { explorerUrl } from "../const/aLinks";
const FaBsc = '/icons/bscscan-logo.svg';
const bscLink = explorerUrl;

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
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box style={{position: 'relative', bottom: 0, width: '100%', marginTop: 0}}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2022 Chakra Templates. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
          <SocialButton label={'Github'} href={'https://github.com/daffadevhosting/simpl-nft-marketplace'}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'bscscan'} href={bscLink()} target="_blank" rel="noopener noreferrer">
            <Image src={FaBsc} width={16} height={16} alt="bsc" />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
