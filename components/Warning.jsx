import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { RiWallet3Fill } from 'react-icons/ri';
import css from "../styles/css.module.scss";

export default function Warning() {
  return (
    <Box textAlign="center" py={20} px={10} h={'100vh'}>
<div className={css.loading}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center">
          <RiWallet3Fill size={'80px'} color={'grey'} />
        </Flex>
      </Box>
</div>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Restricted
      </Heading>
      <Text color={'gray.500'}>
        Please connect your wallet first.
      </Text>
    </Box>
  );
}
