import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import {
  Box,
  Image,
  Text,
  Button,
  Container,
  useBreakpointValue,
  Skeleton,
} from "@chakra-ui/react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import { sanityImage } from "@/lib/sanity.image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { styleSlider } from "./utils";
import { IHero, THero } from "@/typesSanity/docs/hero";
import Link from "next/link";
import { client } from "@/lib/sanity.client";

interface IProps {
  dataHero: IHero;
}

const Hero = ({ dataHero }: IProps) => {
  const maxH = useBreakpointValue(
    { base: "750px", lg: "800px" },
    { ssr: false }
  );
  const [data, setData] = useState<IHero>(dataHero);
  const { width, height } = useWindowDimensions();
  const [isPaginations, setIsPagination] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const query = `
    *[_id == '${data._id}']{
        ...,
        contenido[]{
          ...,
          'urlData': *[_id == ^.url._ref]{
                  'url':store.id
                }[0]
        }
      }[0]
  `;

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, [query]);

  const getValue = () => {
    if (width < 600) {
      return "50%";
    }
    if (width > 600 && width < 1800) {
      return "22%";
    }
    if (width > 1800) {
      return "30%";
    }
  };

  const renderSlider = () => {
    if (data) {
      const { contenido } = data;

      const result = contenido.map((item: THero) => {
        return (
          <SwiperSlide key={item._key}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              w="100%"
            >
              <Box h={maxH} w="100%">
                <Skeleton isLoaded={!isLoading} width={"100%"}>
                  <Image
                    src={sanityImage(item.imagen.asset._ref).url()}
                    alt={item._key}
                    objectFit="cover"
                    objectPosition="center"
                    h={maxH}
                    width={"100%"}
                    onLoad={handleImageLoad}
                  />
                </Skeleton>
              </Box>
              <Text
                position="absolute"
                w={isMobile ? "300px" : "500px"}
                top={isMobile ? "80%" : "25%"}
                left={getValue()}
                transform="translate(-50%, -50%)"
                color={item.color_titulo ? item.color_titulo.value : "white"}
                fontSize={isMobile ? "30px" : "50px"}
                fontWeight="100"
                textAlign="left"
                fontFamily="Castoro Titling"
              >
                {item.texto}
                {item.texto_button && item.urlData && (
                  <Box>
                    <Link
                      href={
                        "/productos/detalle/" + item.urlData!.url.toString()
                      }
                    >
                      <Button
                        fontWeight="300"
                        textAlign="center"
                        fontSize={isMobile ? "12px" : "20px"}
                        borderRadius="5px"
                        bg={
                          item.color_boton ? item.color_boton.value : "#997d6c"
                        }
                        color="white"
                        h={isMobile ? "40px" : "55px"}
                        width={isMobile ? "120px" : "auto"}
                      >
                        <Text pr="10px" pl="10px">
                          {item.texto_button}
                        </Text>
                      </Button>
                    </Link>
                  </Box>
                )}
              </Text>
            </Box>
          </SwiperSlide>
        );
      });

      return result;
    }
  };

  useEffect(() => {
    if (width < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    if (width < 768) {
      setIsPagination(true);
    } else {
      setIsPagination(false);
    }
  }, [width]);

  return (
    <Box mb={isMobile ? "20px" : "35px"}>
      <style>{styleSlider}</style>
      <Swiper
        navigation={!isPaginations}
        pagination={true}
        modules={[Navigation, Pagination]}
      >
        {renderSlider()}
      </Swiper>
    </Box>
  );
};

export default Hero;
