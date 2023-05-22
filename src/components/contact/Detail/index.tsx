import {
  Box,
  Text,
  Heading,
  VStack,
  WrapItem,
  HStack,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { BsInstagram, BsTiktok } from "react-icons/bs";
import { MdEmail, MdPhone, MdLocationOn, MdFacebook } from "react-icons/md";

interface IDataContacto {
  _createdAt: string;
  correo: string;
  _rev: string;
  _type: string;
  _id: string;
  telefono: string;
  _updatedAt: string;
  ubicacion: string;
}

interface ContainerProps {
  isMobile: boolean;
  data: IDataContacto;
}

const Detail = (props: ContainerProps) => {
  const { isMobile, data } = props;

  return (
    <WrapItem>
      <Box textAlign={isMobile ? "center" : "left"} mt={isMobile ? "20px" : ""}>
        <Heading color="white" pl={isMobile ? "" : "60px"} pt="40px">
          Contáctanos
        </Heading>
        <Text
          pl={isMobile ? "" : "60px"}
          mt={{ sm: 3, md: 3, lg: 5 }}
          color="white"
        >
          Completa el siguiente formulario para contactarnos
        </Text>
        <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
          <VStack
            pl={0}
            spacing={6}
            alignItems={isMobile ? "center" : "flex-start"}
          >
            <HStack spacing="2" pl={isMobile ? "" : "60px"} cursor="pointer">
              <MdPhone color="white" size="20px" />
              <Text color="white" cursor="pointer">
                <Link href={`tel:${data.telefono}`}>{data.telefono}</Link>
              </Text>
            </HStack>
            <HStack spacing="2" pl={isMobile ? "" : "60px"} cursor="pointer">
              <MdEmail color="white" size="20px" />
              <Text color="white" cursor="pointer">
                {data.correo}
              </Text>
            </HStack>
            <HStack
              spacing="2"
              mt="10px"
              pl={isMobile ? "" : "60px"}
              cursor="pointer"
            >
              <MdLocationOn color="white" size="20px" />
              <Text color="white" cursor="pointer">
                <Link
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    data.ubicacion
                  )}`}
                  isExternal
                >
                  {data.ubicacion}
                </Link>
              </Text>
            </HStack>
          </VStack>
        </Box>
        <HStack
          mt={{ lg: 10, md: 10 }}
          spacing={5}
          px={5}
          alignItems={isMobile ? "center" : "flex-start"}
          justifyContent={isMobile ? "center" : "flex-start"}
          pl={isMobile ? "" : "60px"}
          pb="40px"
        >
          <IconButton
            aria-label="facebook"
            variant="ghost"
            color="white"
            size="lg"
            isRound={true}
            _hover={{}}
            icon={<MdFacebook size="28px" />}
          />
          <IconButton
            aria-label="github"
            variant="ghost"
            color="white"
            size="lg"
            isRound={true}
            _hover={{}}
            icon={<BsInstagram size="28px" />}
          />
        </HStack>
      </Box>
    </WrapItem>
  );
};

export default Detail;
