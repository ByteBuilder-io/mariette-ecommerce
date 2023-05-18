import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { products } from "./utils";
import ProductGridCard from "./ProductGrid";
import { useEffect, useState } from "react";
import { IDataProductos } from "@/typesSanity/docs/productos";
import { client } from "@/lib/sanity.client";

const ProductGrid = ({
  tag,
  currentProduct,
}: {
  tag: string;
  currentProduct: number;
}) => {
  const [data, setData] = useState<IDataProductos[]>();
  const query = `
  *[_type == 'product' && store.status != 'draft' && store.productType == "${tag}" && store.id != ${currentProduct}] {
        "createdAt": store.createdAt,
        "descriptionHtml": store.descriptionHtml,
        "gid": store.gid,
        "id": store.id,
        "isDeleted": store.isDeleted,
        "options": store.options,
        "previewImageUrl": store.previewImageUrl,
        "priceRange": store.priceRange,
        "productType": store.productType,
        "slug": store.slug,
        "status": store.status,
        "tags": store.tags,
        "title": store.title,
        "variants": store.variants,
        "vendor": store.vendor,
    }
    `;

  useEffect(() => {
    async function fetchData() {
      const data: IDataProductos[] = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, [query]);
  return (
    <>
      {data && (
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
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {data && data.length > 0 && (
                <ProductCard products={data} totalRows={data.length / 4} />
              )}
            </SimpleGrid>
          </ProductGridCard>
        </Box>
      )}
    </>
  );
};

export default ProductGrid;
