/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Card,
  Image,
  CardHeader,
  Stack,
  StackProps,
  Text,
  CardBody,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { PriceTag } from "./PriceTag";
import { IDataProductos } from "@/typesSanity/docs/productos";

import Link from "next/link";
import { graphQLClient } from "@/lib/shopify";

interface Props {
  totalRows: number;
  products: IDataProductos[];
  rootProps?: StackProps;
  loading: boolean;
}

interface IDataImage {
  product: {
    images: {
      edges: { node: { originalSrc: string } }[];
    };
    compareAtPriceRange: { maxVariantPrice: { amount: string } };
  };
}

const ProductCard = (props: Props) => {
  const { products, rootProps, loading } = props;
  const [productImages, setProductImages] = useState<IDataImage[]>([]);
  const [isImageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  useEffect(() => {
    const fetchProductImages = async () => {
      // Realiza la consulta a la API de Shopify para obtener las imágenes de cada producto
      const imagePromises = products.map(async (product) => {
        const s = `
          query {
            product(id: "${product.gid}") {
              images(first: 10) {
                edges {
                  node {
                    originalSrc
                  }
                }
              }
              compareAtPriceRange {
                maxVariantPrice {
                  amount
                }
              }
            }
          }
        `;
        const image: IDataImage = await graphQLClient.request(s);
        return image;
      });

      const images = await Promise.all(imagePromises);
      setProductImages(images);
    };

    fetchProductImages();
  }, [products]);

  const renderCards = () => {
    if (products && products.length > 0 && productImages.length > 0) {
      const result = products.map((product, index) => {
        const productImage = productImages[index];

        let imageSrc = "";
        if (
          productImage != undefined &&
          productImage.product?.images.edges.length !== 0
        ) {
          imageSrc =
            productImage.product?.images.edges.length > 1
              ? productImage.product.images.edges[1].node.originalSrc
              : productImage.product?.images.edges[0].node.originalSrc;
        } else {
          imageSrc = product.previewImageUrl;
        }
        const preloadedImage = document.createElement("img");
        preloadedImage.src = imageSrc;
        console.log(product.priceRange);
        return (
          <Card
            cursor="pointer"
            boxShadow="lg"
            key={index}
            display={loading ? "none" : ""}>
            <Link href={"/productos/detalle/" + product.id}>
              <CardHeader padding="0" margin="0">
                <Box width="100%" height="auto">
                  <Skeleton
                    isLoaded={isImageLoaded}
                    startColor="gray.200"
                    endColor="white">
                    <Image
                      _hover={{
                        content: `url(${imageSrc})`,
                      }}
                      src={product.previewImageUrl}
                      alt={product._id}
                      w="100%"
                      h="auto"
                      borderTopRadius="5px"
                      onLoad={handleImageLoad}
                    />
                  </Skeleton>
                  <Image
                    src={product.previewImageUrl}
                    alt={product._id}
                    onLoad={handleImageLoad}
                    style={{ display: "none" }}
                  />
                </Box>
              </CardHeader>
              <CardBody
                height="180px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center">
                <Text
                  textAlign="center"
                  fontSize={"2xl"}
                  fontFamily={"Castoro"}>
                  {product.title}
                </Text>
                <Stack
                  direction={"row"}
                  align={"center"}
                  justifyContent={"center"}
                  fontSize="14px"
                  fontWeight="semibold">
                  {productImage.product && (
                    <PriceTag
                      price={
                        parseFloat(
                          productImage.product.compareAtPriceRange
                            .maxVariantPrice.amount
                        ) > product.priceRange.maxVariantPrice
                          ? parseFloat(
                              productImage.product.compareAtPriceRange
                                .maxVariantPrice.amount
                            )
                          : product.priceRange.maxVariantPrice
                      }
                      salePrice={
                        parseFloat(
                          productImage.product.compareAtPriceRange
                            .maxVariantPrice.amount
                        ) > product.priceRange.maxVariantPrice
                          ? product.priceRange.maxVariantPrice
                          : 0
                      }
                      currency="USD"
                    />
                  )}
                  {!productImage.product && (
                    <PriceTag
                      price={product.priceRange.maxVariantPrice}
                      salePrice={0}
                      currency="USD"
                    />
                  )}
                </Stack>
              </CardBody>
            </Link>
          </Card>
        );
      });

      return result;
    }
  };

  return <>{renderCards()}</>;
};

export default ProductCard;
