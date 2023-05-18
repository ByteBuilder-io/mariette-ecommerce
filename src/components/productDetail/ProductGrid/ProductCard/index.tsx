import {
  Box,
  Card,
  Image,
  CardHeader,
  Stack,
  StackProps,
  Text,
  CardBody,
} from "@chakra-ui/react";

import { Rating } from "./Rating";
import { FavouriteButton } from "./FavouriteButton";
import { PriceTag } from "./PriceTag";
import { Product } from "../utils";
import { IDataProductos } from "@/typesSanity/docs/productos";
import Link from "next/link";

interface Props {
  totalRows: number;
  products: IDataProductos[];
  rootProps?: StackProps;
}

const ProductCard = (props: Props) => {
  const { products, rootProps } = props;

  const renderCards = () => {
    if (products && products.length > 0) {
      const result = products.map((product, index) => {
        return (
          <Card cursor="pointer" boxShadow="lg" key={index}>
            <Link href={"/productos/detalle/" + product.id}>
              <CardHeader padding="0" margin="0">
                <Box width="100%" height="auto">
                  <Image
                    _hover={{
                      content: `url(${products[0].previewImageUrl})`,
                    }}
                    src={product.previewImageUrl}
                    alt="Imagen"
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
        );
      });

      return result;
    }
  };

  return (
    <>{renderCards()}</>
    // <Link href={"/productos/detalle/" + props.product.id}>
    //   <Stack spacing={{ base: "4", md: "5" }} {...rootProps}>
    //     {/*<AspectRatio ratio={props.totalRows >= 1 ? 4 / 3 : 10 / 3}>*/}
    //     <Image
    //       src={isHovered ? product.previewImageUrl : product.previewImageUrl}
    //       alt={product.title}
    //       draggable="false"
    //       fallback={<Skeleton />}
    //       cursor="pointer"
    //       onMouseOver={handleMouseOver}
    //       onMouseOut={handleMouseOut}
    //       w={"280px"}
    //       h={"210px"}
    //     />
    //     {/*</AspectRatio>*/}
    //     <Stack>
    //       <Stack spacing="1">
    //         <Box textAlign="center">
    //           {" "}
    //           {/* Añadido: Centra el contenido */}
    //           <Text
    //             fontWeight="medium"
    //             color={useColorModeValue("gray.700", "gray.400")}
    //             fontSize="14px"
    //           >
    //             {product.title}
    //           </Text>
    //         </Box>
    //         <PriceTag
    //           price={product.priceRange.maxVariantPrice}
    //           salePrice={0}
    //           currency="USD"
    //         />
    //       </Stack>
    //     </Stack>
    //   </Stack>
    // </Link>
  );
};

export default ProductCard;
