import React from "react";
import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";

const ComingSoon = () => {
  return (
    <Flex
      height="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#f9f9f9"
    >
      <Box
        p={6}
        rounded="md"
        boxShadow="xl"
        backgroundColor="rgba(255, 255, 255, 0.8)"
        textAlign="center"
      >
        <Image
          src="/mariette.png"
          alt="Tu Logo"
          marginBottom={4}
          boxSize="100px"
          display="block"
          margin="0 auto"
        />
        <Heading
          fontFamily={"Montserrat Regular"}
          as="h1"
          fontSize={"20pt"}
          marginBottom={4}
        >
          ¡Próximamente!
        </Heading>
        <Text fontSize="xl">
          Estamos trabajando en algo increíble. ¡Espéralo pronto!
        </Text>
      </Box>
    </Flex>
  );
};

export default ComingSoon;
