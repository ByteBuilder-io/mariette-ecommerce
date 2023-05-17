import {
  Box,
  Text,
  Heading,
  VStack,
  WrapItem,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { BsInstagram, BsTiktok } from "react-icons/bs";
import { MdEmail, MdPhone, MdLocationOn, MdFacebook } from "react-icons/md";

interface ContainerProps {
  isMobile: boolean;
}

const Detail = (props: ContainerProps) => {
  const { isMobile } = props;
  
  return (
    <WrapItem>
      <Box textAlign={isMobile ? "center" : "left"} mt={isMobile ? "20px" : ""}>
        <Heading>Contáctanos</Heading>
        <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
          Completa el siguiente formulario para contactarnos
        </Text>
        <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
          <VStack
            pl={0}
            spacing={6}
            alignItems={isMobile ? "center" : "flex-start"}
          >
            <HStack spacing="2">
              <MdPhone color="white" size="20px" />
              <span>+52 5610256694</span>
            </HStack>
            <HStack spacing="2">
              <MdEmail color="white" size="20px" />
              <span>hello@abc.com</span>
            </HStack>
            <HStack spacing="2" mt="10px">
              <MdLocationOn color="white" size="20px" />
              <span>Guadalajara, Jalisco</span>
            </HStack>
          </VStack>
        </Box>
        <HStack
          mt={{ lg: 10, md: 10 }}
          spacing={5}
          px={5}
          alignItems={isMobile ? "center" : "flex-start"}
          justifyContent={isMobile ? "center" : "flex-start"}
        >
          <IconButton
            aria-label="facebook"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ bg: "#0D74FF" }}
            icon={<MdFacebook size="28px" />}
          />
          <IconButton
            aria-label="github"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ bg: "#0D74FF" }}
            icon={<BsInstagram size="28px" />}
          />
          <IconButton
            aria-label="discord"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ bg: "#0D74FF" }}
            icon={<BsTiktok size="28px" />}
          />
        </HStack>
      </Box>
    </WrapItem>
  );
};

export default Detail;
