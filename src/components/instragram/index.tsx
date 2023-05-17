import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Image,
  Heading,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";
import { imgSample } from "./utils";
import { FaInstagram } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Instagram = () => {
  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  const renderInstagram = () => {
    const result = imgSample.map(
      (item: { img: string; url: string }, index: number) => {
        return (
          <Card
            borderRadius="none"
            height="339px"
            width="339px"
            key={index}
            cursor="pointer"
            onClick={() => {
              openLink(item.url);
            }}
          >
            <Box position="relative" height="339px" width="339px">
              <Image
                src={item.img}
                alt="Descripción de la imagen"
                objectFit="cover"
                height="100%"
                width="100%"
              />
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bg="black"
                opacity="0"
                transition="opacity 0.3s"
                _hover={{ opacity: 0.5 }} // Cambiamos la opacidad al 50% en estado de hover
              >
                <Flex
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                >
                  <FaInstagram color="white" size={40} />
                </Flex>
              </Box>
            </Box>
          </Card>
        );
      }
    );

    return result;
  };


  // const renderSlider = () => {
  //   if (imgSample && imgSample.length > 0) {

  //     const result = imgSample.map((item: { img: string; url: string }, index: number) => {
  //       return (
  //         <SwiperSlide key={index}>
  //           <Box
  //             display="flex"
  //             alignItems="center"
  //             justifyContent="center"
  //             height="100%"
  //           >
  //             <Box>
  //               <Image
  //                 src={}
  //                 alt={item._key}
  //                 objectFit="cover"
  //                 objectPosition="center"
  //               />
  //             </Box>
  //           </Box>
  //         </SwiperSlide>
  //       );
  //     });

  //     return result;
  //   }
  // };

  return (
    <Box>
      <Text
        textAlign="center"
        fontSize="30px"
        fontFamily="Castoro Titling"
        color="#836a59"
        fontWeight="semibold"
        mb="40px"
      >
        FORMA PARTE DE NUESTRA COMUNIDAD EN INSTAGRAM
      </Text>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {/* <Swiper
          pagination={true}
          modules={[Pagination]}
        >
          {renderSlider()}
        </Swiper> */}
        {renderInstagram()}
      </SimpleGrid>
    </Box>
  );
};

export default Instagram;
