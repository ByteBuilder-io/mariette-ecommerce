import { Fragment, useEffect, useState } from "react";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";

import Zoom from "react-img-zoom";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import Form from "./Form";
import Currency from "./Currency";
import SmallImage from "./SmallImage";
import Description from "./Description";

const ProductDetail = () => {
	const { width, height } = useWindowDimensions();
	const [isMobile, setIsMobile] = useState<boolean>(false)

  const MainImage = ({ src }: any) => (
    <Zoom
      img={src}
      zoomScale={3}
      height={337}
      width={505}
      transitionTime={0.5}
    />
  );

  const SmallImages = () => (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      <SmallImage
        src="https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg"
        isSelected={true}
      />
      <SmallImage
        src="https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg"
        isSelected={false}
      />
      <SmallImage
        src="https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg"
        isSelected={false}
      />
    </Box>
  );

	useEffect(() => {
		if (width < 992) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
	}, [width])

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
              src="https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg"
              alt="Main image"
              zoomScale={3}
              transitionTime={0.5}
              width="100%"
              maxWidth="100%"
            />
            <SmallImages />
          </Flex>
          <Stack spacing={{ base: "8", md: "4" }} flex="2" alignItems={isMobile ? "center" : "left"}>
            <Text
              fontSize="3xl"
              fontWeight="semibold"
              fontFamily="Castoro Titling"
            >
              {"ANILLO 'CARLOTTA'"}
            </Text>
            <Currency value={18800} />
            <Form />
            <Description />
          </Stack>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default ProductDetail;
