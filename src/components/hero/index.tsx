import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Box, Image, Text, Button, Container } from "@chakra-ui/react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { styleSlider } from "./utils";
import { IHero, THero } from "@/typesSanity/docs/hero";

interface IProps {
  dataHero: IHero;
}

const Hero = ({ dataHero }: IProps) => {
  const maxH = "800px";
  const [data, setData] = useState<IHero>(dataHero);
  const { width, height } = useWindowDimensions();
  const [isPaginations, setIsPagination] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
            >
              <Box maxH={maxH}>
                <Image
                  src={sanityImage(item.imagen.asset._ref).url()}
                  alt={item._key}
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                fontSize={isMobile ? "30px" : "50px"}
                fontWeight="100"
                textAlign="center"
                fontFamily="Castoro Titling"
              >
                {item.texto}
                <Box>
                  <Button
                    fontWeight="300"
                    textAlign="center"
                    fontSize={isMobile ? "12px" : "20px"}
                    borderRadius="none"
                    bg="#997d6c"
                    color="white"
                    h={isMobile ? "40px" : "55px"}
                    width={isMobile ? "120px" : "auto"}
                  >
                    <Text pr="10px" pl="10px">
                      {item.texto_button}
                    </Text>
                  </Button>
                </Box>
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
