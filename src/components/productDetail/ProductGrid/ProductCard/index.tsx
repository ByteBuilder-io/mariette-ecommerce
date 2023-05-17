import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
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
import { IDataProductos } from "@/typesSanity/docs/productos";
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

  return (
    <Link href={"/productos/detalle/" + props.product.id}>
      <Box
        role={"group"}
        p={6}
        maxW={"230px"}
        maxH={"400px"}
        w={"full"}
        bg={"white"}
        boxShadow={"2xl"}
        rounded={"lg"}
        zIndex={1}
        py={20}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url('${product.previewImageUrl}')`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={200}
            width={282}
            objectFit={"cover"}
            src={product.previewImageUrl}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading
            fontSize={"2xl"}
            fontFamily={"Castoro"}
            fontWeight={500}
            textAlign={"center"}
          >
            {product.title}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <PriceTag
              price={product.priceRange.maxVariantPrice}
              salePrice={0}
              currency="USD"
            />
          </Stack>
        </Stack>
      </Box>
    </Link>
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
