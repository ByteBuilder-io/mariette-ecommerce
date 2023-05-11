import { Box, Heading } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { products } from "./utils";
import ProductGridCard from "./ProductGrid";

const ProductGrid = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{ base: "0", md: "8", lg: "12" }}
    py={{ base: "6", md: "8", lg: "12" }}
  >
    <Heading
      as="h2"
      mb="50px"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        width: "70px",
        height: "1px",
        backgroundColor: "gray.400",
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
        width: "70px",
        height: "1px",
        backgroundColor: "gray.400",
      }}
      textAlign="center"
      size="md"
      fontFamily="Castoro Titling"
    >
      Productos Relacionados
    </Heading>
    <ProductGridCard>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGridCard>
  </Box>
);

export default ProductGrid;
