import {
  Box,
  Card,
  Image,
  CardHeader,
  Stack,
  StackProps,
  Text,
  CardBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { graphQLClient } from "@/lib/shopify";

import { IDataProductos } from "@/typesSanity/docs/productos";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { PriceTag } from "@/components/cart/CartItem/PriceTag";

interface Props {
  totalRows: number;
  products: IDataProductos[];
  rootProps?: StackProps;
}

interface IDataImage {
  product: {
    images: {
      edges: { node: { originalSrc: string } }[];
    };
    compareAtPriceRange: { maxVariantPrice: { amount: string } };
  };
}

const RelatedProduct = (props: Props) => {
  const { products, rootProps } = props;
  const items = useBreakpointValue({ base: 1.5, lg: 4.5 }, { ssr: false });
  const [productImages, setProductImages] = useState<IDataImage[]>([]);

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
              ? productImage.product?.images.edges[1].node.originalSrc
              : productImage.product?.images.edges[0].node.originalSrc;
        } else {
          imageSrc = product.previewImageUrl;
        }

        return (
          <SwiperSlide key={index}>
            <Card cursor="pointer" boxShadow="lg" mb="20px">
              <Link href={"/productos/detalle/" + product.id}>
                <CardHeader padding="0" margin="0">
                  <Box width="100%" height="180px">
                    <Image
                      _hover={{
                        content: `url(${imageSrc})`,
                      }}
                      src={product.previewImageUrl}
                      alt={"Related Product"}
                      borderTopRadius="5px"
                      w="100%"
                      h="auto"
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
                  </Stack>
                </CardBody>
              </Link>
            </Card>
          </SwiperSlide>
        );
      });

      return result;
    }
  };

  return (
    <Swiper spaceBetween={15} slidesPerView={items} pagination={true}>
      {renderCards()}
    </Swiper>
  );
};

export default RelatedProduct;
