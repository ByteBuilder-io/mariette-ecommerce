import { Container, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { useRouter } from "next/router";
import { IDataProductos } from "@/typesSanity/docs/productos";
import Filter from "@/components/filter";
import ProductCard from "@/components/productDetail/ProductGrid/ProductCard";

import Link from "next/link";

const Productos = () => {
  const [data, setData] = useState<IDataProductos[]>();
  const router = useRouter();

  const { filter } = router.query;
  const query = `*[_type == 'product' && store.status != 'draft'] {
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
  }`;

  useEffect(() => {
    async function fetchData() {
      const data: IDataProductos[] = await client.fetch(query);
      console.log(filter);
      if (filter != undefined && filter != "" && data) {
        const filteredData = data.filter(
          (item) => item.productType.toLowerCase() === filter
        );
        setData(filteredData);
      } else {
        setData(data);
      }
    }

    fetchData();
  }, [filter, query]);

  return (
    <Container py={10} maxW="1400px">
      <Filter dataProduct={data}>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {data && data.length > 0 && (
            <ProductCard products={data} totalRows={data.length / 4} />
          )}
        </SimpleGrid>
      </Filter>
    </Container>
  );
};

export default Productos;
