import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { Fragment, useEffect, useState } from "react";

import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { styleSlider } from "./utils";

type TMain = {
  contenido: THero[];
};

type THero = {
  imagen: TContenido;
  texto: string;
  texto_button: string;
  _key: string;
};

type TContenido = {
  _type: string;
  asset: {
    _type: string;
    _ref: string;
  };
};

const Hero = () => {
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
            <Box position="relative">
              <Image
                src={sanityImage(item.imagen.asset._ref).url()}
                height="70%"
                width="100%"
                alt={item._key}
              />
              <Text
                position="absolute"
                top="30%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                fontSize="50px"
                fontWeight="100"
                textAlign="center"
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
    <Fragment>
      <style>{styleSlider}</style>
      <Swiper
        navigation={!isPaginations}
        pagination={isPaginations}
        modules={[Navigation, Pagination]}
      >
        {renderSlider()}
      </Swiper>
    </Fragment>
  );
};

export default Hero;
