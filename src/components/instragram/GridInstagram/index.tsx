import { Box, Card, Flex, SimpleGrid, Image } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";

import { imgSample } from "../utils";

interface ContainerProps {
  openLink: (link: string) => void;
}

const GridInstagram = (props: ContainerProps) => {
  const { openLink } = props;
  
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

  return (
    <SimpleGrid
      spacing={3}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {renderInstagram()}
    </SimpleGrid>
  );
};

export default GridInstagram
