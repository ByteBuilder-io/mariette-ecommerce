import { Box, Container } from "@chakra-ui/react";
import Hero from "@/components/hero";
import ProductDetail from "@/components/productDetail";
import ShoppingCart from "@/components/cart";
import Filter from "@/components/filter";
import BasicImage from "@/components/basicImage";
import CardCategory from "@/components/cards/cardCategory";

const Home = () => {
  return (
    <Container w={"100%"} maxW={"1400px"}>
      <BasicImage />
      <Filter />
      <ProductDetail />
      <ShoppingCart />
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
