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

import { Rating } from "./Rating";
import { FavouriteButton } from "./FavouriteButton";
import { PriceTag } from "./PriceTag";
import { Product } from "../utils";
import { IDataProductos } from "@/typesSanity/docs/productos";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IDataImage } from "@/pages/productos/detalle/[...slug]";
import { graphQLClient } from "@/lib/shopify";

interface Props {
  totalRows: number;
  products: IDataProductos[];
  rootProps?: StackProps;
}

const ProductCard = (props: Props) => {
  const { products, rootProps } = props;
  const [productImages, setProductImages] = useState<IDataImage[]>([]); // Estado local para almacenar las imágenes de los productos
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
        console.log(productImage);
        let imageSrc = "";
        if (productImage != undefined) {
          imageSrc =
            productImage.product.images.edges.length > 1
              ? productImage.product.images.edges[1].node.originalSrc
              : productImage.product.images.edges[0].node.originalSrc;
        } else {
          imageSrc = product.previewImageUrl;
        }
        const preloadedImage = document.createElement("img");
        preloadedImage.src = imageSrc;

        return (
          <Card cursor="pointer" boxShadow="lg" key={index}>
            <Link href={"/productos/detalle/" + product.id}>
              <CardHeader padding="0" margin="0">
                <Box width="100%" height="auto">
                  <Skeleton
                    isLoaded={isImageLoaded}
                    startColor="gray.200"
                    endColor="white"
                  >
                    <Image
                      _hover={{
                        content: `url(${imageSrc})`,
                      }}
                      src={product.previewImageUrl}
                      alt="Imagen"
                      w="100%"
                      h="auto"
                      onLoad={handleImageLoad}
                    />
                  </Skeleton>
                  <Image
                    src={product.previewImageUrl}
                    alt="Descripción de la imagen"
                    onLoad={handleImageLoad}
                    style={{ display: "none" }}
                  />
                </Box>
              </CardHeader>
              <CardBody height="133px">
                <Text
                  textAlign="center"
                  fontSize={"2xl"}
                  fontFamily={"Castoro"}
                >
                  {product.title}
                </Text>
                <Stack
                  direction={"row"}
                  align={"center"}
                  justifyContent={"center"}
                  fontSize="14px"
                  fontWeight="semibold"
                >
                  <PriceTag
                    price={product.priceRange.maxVariantPrice}
                    salePrice={0}
                    currency="USD"
                  />
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
