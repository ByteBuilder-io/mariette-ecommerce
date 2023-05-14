import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import { Rating } from "./Rating";
import { FavouriteButton } from "./FavouriteButton";
import { PriceTag } from "./PriceTag";
import { Product } from "../utils";
import { IDataProductos } from "@/typesSanity/productos";
import Link from "next/link";

interface Props {
  totalRows: number;
  product: IDataProductos;
  rootProps?: StackProps;
}

const ProductCard = (props: Props) => {
  const { product, rootProps } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  console.log(props.totalRows);

  return (
    <Link href={"/productos/detalle/" + props.product.id}>
      <Stack spacing={{ base: "4", md: "5" }} {...rootProps}>
        <Box position="relative">
          <AspectRatio ratio={props.totalRows >= 1 ? 4 / 3 : 10 / 3}>
            <Image
              src={
                isHovered ? product.previewImageUrl : product.previewImageUrl
              }
              alt={product.title}
              draggable="false"
              fallback={<Skeleton />}
              cursor="pointer"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              maxW={"280px"}
              maxH={"210px"}
            />
          </AspectRatio>
          {/*<FavouriteButton*/}
          {/*  position="absolute"*/}
          {/*  top="4"*/}
          {/*  right="4"*/}
          {/*  aria-label={`Add ${name} to your favourites`}*/}
          {/*/>*/}
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text
              fontWeight="medium"
              color={useColorModeValue("gray.700", "gray.400")}
              fontSize="14px"
            >
              {product.title}
            </Text>
            <PriceTag
              price={product.priceRange.maxVariantPrice}
              salePrice={0}
              currency="USD"
            />
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
};

export default ProductCard;
