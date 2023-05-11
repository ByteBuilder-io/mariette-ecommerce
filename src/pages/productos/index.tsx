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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { useRouter } from "next/router";
import { IDataProductos } from "@/typesSanity/productos";
import { sanityImage } from "@/lib/sanity.image";

const Productos = () => {
  const [data, setData] = useState<IDataProductos[]>();
  const router = useRouter();
  const { filter } = router.query;
  const query = filter
    ? `*[_type == 'product' && lower(store.productType) match '*${filter}*' && store.status != 'draft']{store}`
    : `*[_type == 'product' && store.status != 'draft']{store}`;

  console.log(query);

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, []);
  console.log(data);
  return (
    <Container py={10} maxW="1200px">
      <SimpleGrid columns={3} spacing={10}>
        {data &&
          data.map((e) => {
            return (
              <Box key={e.store.id}>
                <Card maxW="sm">
                  <CardBody>
                    <Image
                      src={e.store.previewImageUrl}
                      alt={e.store.title}
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{e.store.title}</Heading>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: e.store.descriptionHtml,
                        }}
                      />
                      <Text color="blue.600" fontSize="2xl">
                        ${e.store.priceRange.minVariantPrice} - $
                        {e.store.priceRange.maxVariantPrice}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="blue">
                        Buy now
                      </Button>
                      <Button variant="ghost" colorScheme="blue">
                        Add to cart
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
            );
          })}
      </SimpleGrid>
    </Container>
  );
};

export default Productos;
