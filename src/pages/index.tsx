import { Box } from "@chakra-ui/react";
import Hero from "@/components/hero";
import ProductDetail from "@/components/productDetail";
import ShoppingCart from "@/components/cart";
import Filter from "@/components/filter";
import BasicImage from "@/components/basicImage";

const Home = () => {
  return (
    <Box w={"100%"}>
      <BasicImage />
      <Filter />
      <ProductDetail />
      <ShoppingCart />
      <Hero maxH={"500px"} />
    </Box>
  );
};

export default Home;
