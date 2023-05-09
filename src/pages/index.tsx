import { Box } from "@chakra-ui/react";
import Hero from "@/components/hero";
import ProductDetail from "@/components/productDetail";
import ShoppingCart from "@/components/cart";

const Home = () => {
  return (
    <Box w={"100%"}>
      <ProductDetail />
      <ShoppingCart />
      <Hero maxH={"500px"} />
    </Box>
  );
};

export default Home;
