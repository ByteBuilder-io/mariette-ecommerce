import { Box, Container } from "@chakra-ui/react";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import CardCategory from "@/components/cards/cardCategory";

const Home = () => {
  return (
    <Container w={"100%"} maxW={"1400px"}>
      <Hero maxH={"500px"} />
      <CardCategory />
      <Box
        backgroundColor={"#faf5f1"}
        h="100%"
        position={"absolute"}
        top={0}
        left={0}
        w="100%"
        zIndex={-2}
      />
    </Container>
  );
};

export default Home;
