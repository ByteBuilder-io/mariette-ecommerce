import { Box } from "@chakra-ui/react";
import Hero from "@/components/hero";
import ProductDetail from "@/components/productDetail";

const Home = () => {
  return (
    <Box w={"100%"}>
      <ProductDetail />
      <Hero maxH={"500px"} />
    </Box>
  );
};

export default Home;
