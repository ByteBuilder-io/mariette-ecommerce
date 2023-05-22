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

const RelatedProduct = (props: Props) => {
  const { products, rootProps } = props;
  const items = useBreakpointValue({ base: 1.5, lg: 4.5 }, { ssr: false });

  const renderCards = () => {
    if (products && products.length > 0) {
      const result = products.map((product, index) => {
        return (
          <SwiperSlide key={index}>
            <Card cursor="pointer" boxShadow="lg">
              <Link href={"/productos/detalle/" + product.id}>
                <CardHeader padding="0" margin="0">
                  <Box width="100%" height="auto">
                    <Image
                      _hover={{
                        content: `url(${products[0].previewImageUrl})`,
                      }}
                      src={product.previewImageUrl}
                      alt={product._id}
                      w="100%"
                      h="auto"
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
