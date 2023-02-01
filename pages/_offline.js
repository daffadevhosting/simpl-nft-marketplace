import Head from 'next/head';
import { Box, Heading, Text } from '@chakra-ui/react';
import { RiSignalWifiOffFill } from "react-icons/ri";


const Fallback = () => (
  <>
    <Head>
      <title>SimPL Marketplace</title>
    </Head>
    <Box textAlign="center" py={10} px={6}>
      <RiSignalWifiOffFill boxSize={'50px'} color={'orange.300'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        This website is offline
      </Heading>
      <Text color={'gray.500'}>
        Pleasse check back later.
      </Text>
    </Box>
  </>
)

export default Fallback
