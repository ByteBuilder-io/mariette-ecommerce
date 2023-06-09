import { SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../productDetail/ProductGrid/ProductCard";

import { data } from "./utils"

const CardsNoFilter = () => {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(4, minmax(200px, 1fr))"
    >
      <ProductCard
        products={data}
        totalRows={data.length / 4}
        loading={false}
      />
    </SimpleGrid>
  );
};

export default CardsNoFilter;
