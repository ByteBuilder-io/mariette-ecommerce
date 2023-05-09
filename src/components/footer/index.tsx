import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Input,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";
import { IDataFooter } from "@/typesSanity/footer";
import SocialButton from "../commons/socialMedia";

import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";
import { IconType } from "react-icons";


const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const query = `*[_type == "footer"]`;
  const [data, setData] = useState<IDataFooter[]>();

  const iconos: { [nombre: string]: IconType } = {
    FaInstagram: FaInstagram,
    FaTwitter: FaTwitter,
    FaFacebook: FaFacebook,
    FaYoutube: FaYoutube,
    FaTiktok: FaTiktok,
  };

  const renderSocialMedia = () => {
    if (data && data.length > 0) {
      const { enlaces } = data[0];

      const result = enlaces.map(
        (item: {
          icono: string;
          nombre: string;
          url: string;
          _key: string;
        }) => {
          const Icono = iconos[item.icono];
          return (
            <SocialButton label={item.nombre} href={item.url} key={item._key}>
              <Icono key={item.icono} />
            </SocialButton>
          );
        }
      );

      return result;
    }
  };

  const renderAboutUs = (
    type: "sobre_nosotros_apartado_1" | "sobre_nosotros_apartado_2"
  ) => {
    if (data && data.length > 0) {
      const dataDetail = data[0][type];

      const result = dataDetail.map(
        (item: { _key: string; nombre: string; url?: string }) => {
          return (
            <Link href={item.url} key={item._key}>
              {item.nombre}
            </Link>
          );
        }
      );

      return result;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, [query]);

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              {data && (
                <Image
                  src={sanityImage(data[0].logo.asset._ref).url()}
                  maxW="150px"
                  alt="logo"
                />
              )}
            </Box>
            <Text fontSize={"sm"}>{data ? data[0].derechos : ""}</Text>
            <Stack direction={"row"} spacing={6}>
              {data && renderSocialMedia()}
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            {renderAboutUs("sobre_nosotros_apartado_1")}
          </Stack>
          <Stack align={"flex-start"}>
            {renderAboutUs("sobre_nosotros_apartado_2")}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Buscar</ListHeader>
            <Stack direction={"row"}>
              <Input
                placeholder={"Buscar..."}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
