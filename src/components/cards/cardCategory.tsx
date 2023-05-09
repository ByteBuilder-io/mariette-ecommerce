import {
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  keyframes,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";

const CardCategory = () => {
  return (
    <Container w={"100%"} maxW={"1400px"} py={10}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Heading textColor={"#836a59"} fontFamily={"heading"} size={"lg"}>
          Categorias
        </Heading>
      </Box>

      <Wrap spacing="30px" justify="center" py={10}>
        <WrapItem>
          <FlipCard />
        </WrapItem>
        <WrapItem>
          <FlipCard />
        </WrapItem>
        <WrapItem>
          <FlipCard />
        </WrapItem>
        <WrapItem>
          <FlipCard />
        </WrapItem>
        <WrapItem>
          <FlipCard />
        </WrapItem>
      </Wrap>
    </Container>
  );
};

const FlipCard = () => {
  const [blur, setBlur] = useState(false);

  const handleFlipStart = () => {
    setBlur(true);
  };

  const handleFlipEnd = () => {
    setBlur(false);
  };

  return (
    <Flex
      w="400px"
      h="200px"
      onMouseEnter={handleFlipStart}
      onMouseLeave={handleFlipEnd}
      position="relative"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {blur && (
        <Heading color={"black"} fontSize={"3xl"}>
          aretes
        </Heading>
      )}
      <Image
        position={"absolute"}
        zIndex={-1}
        src={
          "https://mariette.com.mx/wp-content/uploads/2022/10/LUISA-1-1024x683.jpg"
        }
        className="fade-out-hover"
        opacity={blur ? 0.3 : 1}
        transition="opacity 0.2s ease"
        w="400px"
        h="200px"
      />
    </Flex>
  );
};

export default CardCategory;
