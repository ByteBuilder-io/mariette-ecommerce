import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaInstagram } from "react-icons/fa";
import { imgSample } from "../utils";

const SliderInstagram = () => {

  const renderSlides = () => {
    const result = imgSample.map((item: { img: string; url: string }, index: number) => {
      return (
        <SwiperSlide key={index} style={{ width: "280px", height: "220px" }}>
          <Image
            src={item.img}
            alt="Image 1"
            w="100%"
            h="100%"
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.5)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
              <FaInstagram color="white" size={30}/>           
          </Box>
        </SwiperSlide>
      )
    })

    return result
  }

  return (
    <Box>
      <Swiper
        slidesPerView={1.5}
        pagination={{ clickable: true }}
        spaceBetween={16}
      >
        {renderSlides()}
      </Swiper>
    </Box>
  );
};

export default SliderInstagram;
