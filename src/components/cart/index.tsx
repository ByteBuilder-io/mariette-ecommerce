import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import CartItem from "./CartItem";
import CartOrderSummary from "./CartOrderSummary";
import { cartData } from "./utils";
import { useEffect, useState } from "react";
import { IDataProductos } from "@/typesSanity/productos";
import { client } from "@/lib/sanity.client";
import { graphQLClient } from "@/lib/shopify";
import { IDataImage } from "@/pages/productos/detalle/[...slug]";
import Cookies from "js-cookie";

interface IItemsData {
  node: {
    id: string;
    quatity: number;
    title: string;
    variant: {
      id: string;
      image: {
        originalSrc: string;
      };
      priceV2: {
        amount: string;
      };
      title: string;
    };
  };
}
interface IDataCart {
  node: {
    id: string;
    totalPriceV2: {
      amount: string;
    };
    lineItems: { edges: IItemsData[] };
  };
}
const ShoppingCart = () => {
  const [dataCart, setDataCart] = useState<IDataCart>();
  useEffect(() => {
    async function fetchData() {
      const idCart = Cookies.get("idCart");
      console.log(idCart);
      const s = `
          query{
            node(
              id: "${idCart}"
            ) {
              ... on Checkout {
                id
                lineItems(first: 10) {
                  edges {
                    node {
                      id
                      title
                      quantity
                      variant {
                        id
                        title
                        image {
                          originalSrc
                        }
                        priceV2 {
                          amount
                        }
                      }
                    }
                  }
                }
                totalPriceV2 {
                  amount
                }
              }
            }
          }
        `;

      // Utilizando el cliente GraphQL
      const dataCart: IDataCart = await graphQLClient.request(s);
      setDataCart(dataCart);
      console.log(dataCart);
    }
    fetchData();
  }, []);
  return (
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      {dataCart && (
        <Stack
          direction={{ base: "column", lg: "column" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2">
            <Stack spacing="6">
              {dataCart.node.lineItems.edges.map((item) => (
                <CartItem
                  key={item.node.id}
                  price={item.node.variant.priceV2.amount}
                  name={item.node.title}
                  currency={"MXN"}
                  description={item.node.variant.title}
                  imageUrl={item.node.variant.image.originalSrc}
                  quantity={item.node.quatity}
                />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary total={dataCart.node.totalPriceV2.amount} />
            {/*<HStack mt="6" fontWeight="semibold">*/}
            {/*  <p>o</p>*/}
            {/*  <Link color="#846A5A" fontWeight="bold">*/}
            {/*    Continuar comprando*/}
            {/*  </Link>*/}
            {/*</HStack>*/}
          </Flex>
        </Stack>
      )}
    </Box>
  );
};

export default ShoppingCart;
