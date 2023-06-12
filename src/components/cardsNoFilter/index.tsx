import { Container, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../productDetail/ProductGrid/ProductCard";

import { data } from "./utils";
import { useEffect, useState } from "react";
import { IDataProductos } from "@/typesSanity/docs/productos";
import { client } from "@/lib/sanity.client";

const CardsNoFilter = () => {
  const [dataAll, setDataAll] = useState<IDataProductos[]>();

  const query = `*[_type == 'product' && store.status != 'draft' && store.isDeleted == false && store.productType == 'Gemas'] {
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
    "variants": store.variants[] {
      'data': *[_id == ^._ref]{
        'option1': store.option1,
        'option2': store.option2
      }[0]
    },
    "vendor": store.vendor
  }`;

  useEffect(() => {
    async function fetchData() {
      const data: IDataProductos[] = await client.fetch(query);
      setDataAll(data);
    }

    fetchData();
  }, [query]);
  return (
    <Container maxW="1400px" w={"100%"} pb={10}>
      <SimpleGrid spacing={4} templateColumns="repeat(4, minmax(200px, 1fr))">
        {dataAll && (
          <ProductCard
            products={dataAll!}
            totalRows={dataAll!.length / 4}
            loading={false}
          />
        )}
      </SimpleGrid>
    </Container>
  );
};

export default CardsNoFilter;
