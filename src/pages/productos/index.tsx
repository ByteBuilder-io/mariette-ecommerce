import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Image,
  Heading,
  Text,
  Button,
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { useRouter } from "next/router";
import { IDataProductos } from "@/typesSanity/docs/productos";
import { sanityImage } from "@/lib/sanity.image";
import Filter from "@/components/filter";
import ProductGrid from "@/components/productDetail/ProductGrid";
import { products } from "@/components/productDetail/ProductGrid/utils";
import ProductCard from "@/components/productDetail/ProductGrid/ProductCard";
import ProductGridCard from "@/components/productDetail/ProductGrid/ProductGrid";

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
  }, [filter]);
  return (
    <Container py={10} maxW="1400px">
      <Filter>
        <Wrap spacing="30px" py={10} px={1}>
          {data &&
            data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                totalRows={data.length / 4}
              />
            ))}
        </Wrap>
      </Filter>
    </Container>
  );
};

export default Productos;
