import { Fragment, useEffect, useState } from "react";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";

import Zoom from "react-img-zoom";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import Form, { IOptions } from "./Form";
import Currency from "./Currency";
import SmallImages from "./SmallImages";
import Description from "./Description";
import ProductGrid from "./ProductGrid";
import { IDataProductos } from "@/typesSanity/docs/productos";
import { IDataImage } from "@/pages/productos/detalle/[...slug]";
import Loading from "../commons/Loading";

interface Props {
  producto: IDataProductos;
  images: { node: { originalSrc: string } }[];
}
const ProductDetail = ({ producto, images }: Props) => {
  const { width, height } = useWindowDimensions();
  const [available, setAvailable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [data, setData] = useState(images);
  const [imgMain, setImgMain] = useState<string>(images[0].node.originalSrc);
  const [value, setValue] = useState<number>(
    producto.priceRange.maxVariantPrice
  );
  const [options, setOptions] = useState<IOptions[]>(producto.options);

  useEffect(() => {
    if (producto.productType === "Anillos") {
      setOptions([
        {
          name: "Talla",
          values: [
            "4",
            "4.5",
            "5",
            "5.5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "8.5",
            "9",
          ],
          _key: "Talla",
          _type: "option",
        },
        {
          name: "Color",
          values: ["Rosa", "Amarillo", "Blanco"],
          _key: "Color",
          _type: "option",
        },
        ...options,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setImgMain(data[index].node.originalSrc);
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

  useEffect(() => {
    setImgMain(images[0].node.originalSrc);
    setData(images);
    setLoading(false);
  }, [images]);

  if (loading) {
    return <Loading />;
  }

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
            <Currency value={value} />
            <Form
              options={options}
              idProduct={producto.gid}
              setValue={setValue}
              type={producto.productType}
              setAvailable={(e) => setAvailable(e)}
            />
            {/*<Description />*/}
            <Box
              dangerouslySetInnerHTML={{ __html: producto.descriptionHtml }}
            />
          </Stack>
        </Stack>
        <ProductGrid tag={producto.tags} currentProduct={producto.id} />
      </Box>
    </Fragment>
  );
};

export default ProductDetail;
