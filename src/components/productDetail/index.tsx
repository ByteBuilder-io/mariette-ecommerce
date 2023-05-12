import { Fragment, useEffect, useState } from "react";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";

import Zoom from "react-img-zoom";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import Form from "./Form";
import Currency from "./Currency";
import SmallImages from "./SmallImages";
import Description from "./Description";
import ProductGrid from "./ProductGrid";
import { IDataProductos } from "@/typesSanity/productos";

interface Props {
  producto: IDataProductos;
}
const ProductDetail = ({ producto }: Props) => {
  const { width, height } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [data, setData] = useState([
    {
      img: "https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg",
      isSelected: true,
    },
    {
      img: "https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-5-scaled.jpg",
      isSelected: false,
    },
    {
      img: "https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-2-scaled.jpg",
      isSelected: false,
    },
    {
      img: "https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-3-scaled.jpg",
      isSelected: false,
    },
  ]);
  const [imgMain, setImgMain] = useState<string>(data[0].img);

  const MainImage = ({ src }: any) => (
    <Zoom
      img={src}
      zoomScale={3}
      height={337}
      width={isMobile ? 405 : 505}
      transitionTime={0.5}
    />
  );

  const handleImageClick = (index: number) => {
    setImgMain(data[index].img);
    const newData = data.map((item, i) => {
      if (i === index) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setData(newData);
  };

  useEffect(() => {
    if (width < 992) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <Fragment>
      <Box
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Flex direction="column" align="center" flex="1">
            <MainImage
              src={imgMain}
              alt="Main image"
              zoomScale={3}
              transitionTime={0.5}
              width="100%"
              maxWidth="100%"
            />
            <SmallImages data={data} handleImageClick={handleImageClick} />
          </Flex>
          <Stack
            spacing={{ base: "8", md: "4" }}
            flex="2"
            alignItems={isMobile ? "center" : "left"}
          >
            <Text
              fontSize="3xl"
              fontWeight="semibold"
              fontFamily="Castoro Titling"
            >
              {producto.title}
            </Text>
            <Currency value={producto.priceRange.maxVariantPrice} />
            <Form />
            <Description />
          </Stack>
        </Stack>
        {/*<ProductGrid />*/}
      </Box>
    </Fragment>
  );
};

export default ProductDetail;
