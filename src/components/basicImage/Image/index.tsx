import {
  Box,
  Flex,
  Text,
  Image,
  Center,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import Link from "next/link";

interface Props {
  text: string;
  imageUrl: string;
  position: number;
  data: any;
  idProduct: number;
}

const ImageText = ({ text, imageUrl, position, idProduct, data }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    if (width < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  const goToPage = (item: string) => {
    router.push(item);
  };

  const renderText = () => {
    if (position === 1) {
      return (
        <Box
          maxW={{ base: "3xl", lg: "1336px" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            boxShadow="0 8px 20px rgba(0, 0, 0, 0.2)"
          >
            <Box
              w={{ base: "100%", md: "80%" }}
              mb={{ base: "0", md: "0" }}
              bg={data.color_fondo ? data.color_fondo.hex : "#f4eee7"}
              borderRadius="5px"
            >
              <Stack
                align="center"
                display="flex"
                justifyContent="center"
                height="100%"
                mb={isMobile ? "20px" : ""}
                mt={isMobile ? "20px" : ""}
              >
                <Text
                  align="center"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize={isMobile ? "24px" : "30px"}
                  fontFamily="Castoro Titling"
                  pl="35px"
                  pr="35px"
                  color={data.color_texto ? data.color_texto.value : "black"}
                >
                  {text}
                </Text>
                <Text
                  align="center"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize={isMobile ? "14px" : "20px"}
                  fontFamily="Castoro Titling"
                  pl="35px"
                  pr="35px"
                  color={data.color_texto ? data.color_texto.value : "black"}
                >
                  {data.text_subtitulo}
                </Text>
                {data.text_button && (
                  <Link href={"/productos/detalle/" + idProduct.toString()}>
                    <Button
                      fontWeight="300"
                      textAlign="center"
                      fontSize={isMobile ? "12px" : "20px"}
                      borderRadius="5px"
                      bg={
                        data.color_botton ? data.color_botton.value : "#997d6c"
                      }
                      color="white"
                      h={isMobile ? "40px" : "55px"}
                      width={isMobile ? "120px" : "auto"}
                    >
                      <Text pr="10px" pl="10px" fontFamily="Castoro Titling">
                        {data.text_button}
                      </Text>
                    </Button>
                  </Link>
                )}
              </Stack>
            </Box>
            <Box w={{ base: "100%", md: "80%" }} borderRadius="5px">
              <Image
                src={imageUrl}
                alt={text}
                borderTopRightRadius="5px"
                borderBottomRightRadius="5px"
              />
            </Box>
          </Flex>
        </Box>
      );
    } else {
      return (
        <Box
          maxW={{ base: "3xl", lg: "1336px" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            boxShadow="0 8px 20px rgba(0, 0, 0, 0.2)"
          >
            <Box w={{ base: "100%", md: "80%" }}>
              <Image
                src={imageUrl}
                alt={text}
                borderTopLeftRadius="5px"
                borderBottomLeftRadius="5px"
              />
            </Box>
            <Box
              w={{ base: "100%", md: "100%" }}
              mb={{ base: "0", md: "0" }}
              bg={data.color_fondo ? data.color_fondo.hex : "#f4eee7"}
              borderRadius="5px"
            >
              <Stack
                align="center"
                display="flex"
                justifyContent="center"
                height="100%"
                mb={isMobile ? "20px" : ""}
                mt={isMobile ? "20px" : ""}
              >
                <Text
                  align="center"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize={isMobile ? "24px" : "30px"}
                  fontFamily="Castoro Titling"
                  pl="35px"
                  pr="35px"
                  color={data.color_texto ? data.color_texto.value : "black"}
                >
                  {text}
                </Text>
                <Text
                  align="center"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize={isMobile ? "14px" : "20px"}
                  fontFamily="Castoro Titling"
                  pl="35px"
                  pr="35px"
                  color={data.color_texto ? data.color_texto.value : "black"}
                >
                  {data.text_subtitulo}
                </Text>
                {data.text_button && (
                  <Link href={"/productos/detalle/" + idProduct.toString()}>
                    <Button
                      fontWeight="300"
                      textAlign="center"
                      fontSize={isMobile ? "12px" : "20px"}
                      borderRadius="5px"
                      bg={
                        data.color_botton ? data.color_botton.value : "#997d6c"
                      }
                      color="white"
                      h={isMobile ? "40px" : "55px"}
                      width={isMobile ? "120px" : "auto"}
                    >
                      <Text pr="10px" pl="10px" fontFamily="Castoro Titling">
                        {data.text_button}
                      </Text>
                    </Button>
                  </Link>
                )}
              </Stack>
            </Box>
          </Flex>
        </Box>
      );
    }
  };

  return <Center>{renderText()}</Center>;
};

export default ImageText;
