import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useWindowDimensions from "@/hooks/useWindowDimensions";

interface Props {
  text: string;
  imageUrl: string;
  position: number;
}

const ImageText = ({ text, imageUrl, position }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (width < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  const renderText = () => {
    if (position === 1) {
      return (
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Box
              w={{ base: "100%", md: "40%" }}
              mb={{ base: "0", md: "0" }}
              bg="#f4eee7"
            >
              <Text
                align="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="90%"
                fontSize={isMobile ? "24px" : "30px"}
                fontFamily="Castoro Titling"
                pl="35px"
                pr="35px"
              >
                {text}
              </Text>
            </Box>
            <Box w={{ base: "100%", md: "60%" }}>
              <Image src={imageUrl} alt="img" />
            </Box>
          </Flex>
        </Box>
      );
    } else {
      return (
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Box w={{ base: "100%", md: "60%" }}>
              <Image src={imageUrl} alt="img" />
            </Box>
            <Box
              w={{ base: "100%", md: "40%" }}
              mb={{ base: "4", md: "0" }}
              bg="#f4eee7"
            >
              <Text
                align="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="90%"
                fontSize={isMobile ? "24px" : "30px"}
                fontFamily="Castoro Titling"
                pl="35px"
                pr="35px"
              >
                {text}
              </Text>
            </Box>
          </Flex>
        </Box>
      );
    }
  };

  return <>{renderText()}</>;
};

export default ImageText;
