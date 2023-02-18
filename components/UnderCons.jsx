import { Box, Heading, Text } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import css from "../styles/css.module.css";

export default function UnderCons() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
      <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        This page is on development
      </Heading>
      <Text color={'gray.500'}>
       Please Check Back Later.
      </Text>
      </Box>
    </Box>
  );
}
