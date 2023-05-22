import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6} h={"600px"}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, #a47e6c, #a47e6c)"
        backgroundClip="text"
      >
        :C
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Al parecer no hay resultados
      </Text>
      <Text color={"gray.500"} mb={6}>
        No te preocupes aun tenemos muchas mas categorias las cuales explorar
      </Text>

      <Link href={"/"}>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, #a47e6c, #a47e6c)"
          color="white"
          variant="solid"
        >
          Regresar
        </Button>
      </Link>
    </Box>
  );
}
