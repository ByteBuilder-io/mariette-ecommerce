import {
  Box,
  Center,
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
import { IDataProductos } from "@/typesSanity/docs/productos";
import { client } from "@/lib/sanity.client";
import { graphQLClient } from "@/lib/shopify";
import { IDataImage } from "@/pages/productos/detalle/[...slug]";
import Cookies from "js-cookie";
import { useCounter } from "@/hooks/useContador";

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
export interface IDataCart {
  node: {
    id: string;
    totalPriceV2: {
      amount: string;
    };
    lineItems: { edges: IItemsData[] };
  };
}

interface Product {
  id: string;
  product: string;
  detail: {
    Metal?: string;
    Gema?: string;
    Talla?: string;
  };
}
const ShoppingCart = () => {
  const { count, setCount } = useCounter();
  const [dataCart, setDataCart] = useState<IDataCart>();
  const [cartId, setCardId] = useState<string>();
  useEffect(() => {
    async function fetchData() {
      const idCart = Cookies.get("idCart");
      setCardId(idCart);

      if (idCart) {
        const s = `
          {
            node(id: "${idCart}") {
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
                        product {
                          id
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
      }
    }
    fetchData();
  }, []);

  const updateCart = async () => {
    const s = `
          query{
            node(
              id: "${cartId}"
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
    setCount(dataCart.node.lineItems.edges.length);
    return;
  };

  const onDeleteProduct = async (productId: string, variantId: string) => {
    const queryDeleteProduct = `
        mutation deleteCartItem {
          checkoutLineItemsRemove(checkoutId: "${cartId}", lineItemIds: "${productId}") {
            checkout {
              id
            }
          }
        }
    `;
    await graphQLClient.request(queryDeleteProduct);
    await updateCart();
    const products = Cookies.get("products");

    if (products != undefined) {
      let data = JSON.parse(products);
      data = data.filter((obj: Product) => obj.id != variantId);
      await Cookies.set("products", JSON.stringify(data));
    }
  };
  return (
    <>
      {count === 0 ? (
        <Center py={10}>
          <Box>Tu carrito esta vacio :c</Box>
        </Center>
      ) : (
        <></>
      )}
      {dataCart && (
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
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
                    idProduct={item.node.id}
                    variantId={item.node.variant.id}
                    onClickDelete={onDeleteProduct}
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
        </Box>
      )}
    </>
  );
};

export default ShoppingCart;
