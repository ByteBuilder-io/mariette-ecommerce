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
import { THero, TMain } from "@/typesSanity/hero";

interface IProps {
  maxH: string | number;
}

const Hero = ({ maxH }: IProps) => {
  const query = `*[_type == "hero"]`;
  const [data, setData] = useState<TMain[]>();
  const { width, height } = useWindowDimensions();
  const [isPaginations, setIsPagination] = useState<boolean>(false);

  const renderSlider = () => {
    if (data && data.length > 0) {
      const { contenido } = data[0];

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
                fontSize="50px"
                fontWeight="100"
                textAlign="center"
                fontFamily="Castoro Titling"
              >
                {item.texto}
                <Box>
                  <Button
                    fontWeight="300"
                    textAlign="center"
                    borderRadius="none"
                    bg="#997d6c"
                    color="white"
                    h="55px"
                    width="150px"
                  >
                    {item.texto_button}
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
    if (width < 768) {
      setIsPagination(true);
    } else {
      setIsPagination(false);
    }
  }, [width]);

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, [query]);

  return (
    <Container maxH={maxH} maxW={"1400px"}>
      <style>{styleSlider}</style>
      <Swiper
        navigation={!isPaginations}
        pagination={true}
        modules={[Navigation, Pagination]}
      >
        {renderSlider()}
      </Swiper>
    </Container>
  );
};

export default Hero;
