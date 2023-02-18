import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { RiIndeterminateCircleFill } from 'react-icons/ri';
import Hover from "react-3d-hover";
import css from "../styles/css.module.css";

export default function Warning() {
  return (
    <Box textAlign="center" py={20} px={10} h={'100vh'}>
<div className={css.loading}>
      <Box display="inline-block">
          <Hover
            perspective={1100}
            max ={35}
            data-tilt data-tilt-max="35"
            data-tilt-speed="1000"
            data-tilt-glare="true"
            data-tilt-gyroscope="true">
            <Flex className={css.slideInUp}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg={'white'}
              rounded={'50%'}
              w={'200px'}
              h={'200px'}
              textAlign="center">
          <RiIndeterminateCircleFill size={'200px'} color={'red'} />
        </Flex>
      </Hover>
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
