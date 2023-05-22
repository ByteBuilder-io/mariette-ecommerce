import {
  Box,
  Container,
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
import { IDataFooter, IUrl } from "@/typesSanity/docs/footer";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import SocialButton from "../commons/socialMedia";

import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";
import { IconType } from "react-icons";
import Link from "next/link";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();
  const query = `*[_type == "settings"]{
  'enlaces': footer.enlaces,
    'derechos': footer.derechos,
    'sobre_nosotros_apartado_1': footer.sobre_nosotros_apartado_1[]{
      ...,
      'dataUrl': *[_id == ^.url._ref]{
        'url': slug.current
      }[0]
    },
    'sobre_nosotros_apartado_2': footer.sobre_nosotros_apartado_2[]{
      ...,
      'dataUrl': *[_id == ^.url._ref]{
        'url': slug.current
      }[0]
    },
    'logo': footer.logo
}`;
  const [data, setData] = useState<IDataFooter>();

  const iconos: { [nombre: string]: IconType } = {
    FaInstagram: FaInstagram,
    FaTwitter: FaTwitter,
    FaFacebook: FaFacebook,
    FaYoutube: FaYoutube,
    FaTiktok: FaTiktok,
  };

  const renderSocialMedia = () => {
    if (data) {
      const { enlaces } = data;

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
    if (data) {
      const dataDetail = data[type];
      const result = dataDetail.map(
        (item: { _key: string; nombre: string; dataUrl: { url: string } }) => {
          const url =
            item.dataUrl.url === "PaginaDeInicio" ? "" : item.dataUrl.url;
          return (
            <Link href={url} key={item._key}>
              <Text fontSize="14px" textAlign="center">
                {item.nombre}
              </Text>
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

      setData(data[0]);
    }

    fetchData();
  }, [query]);

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      width="100%"
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack
            spacing={6}
            justify={isMobile ? "center" : ""}
            align={isMobile ? "center" : ""}
          >
            <Box>
              {data && (
                <Image
                  src={sanityImage(data.logo.asset._ref).url()}
                  maxW="150px"
                  alt={data.logo.asset._ref}
                />
              )}
            </Box>
            <Text fontSize={"sm"} textAlign={isMobile ? "center" : "left"}>
              {data ? data.derechos : ""}
            </Text>
            <Stack
              direction={"row"}
              spacing={6}
              justify={isMobile ? "center" : ""}
            >
              {data && renderSocialMedia()}
            </Stack>
          </Stack>
          <Stack
            align={isMobile ? "center" : "center"}
            mr={isMobile ? "" : "80px"}
          >
            {renderAboutUs("sobre_nosotros_apartado_1")}
          </Stack>
          <Stack
            align={isMobile ? "center" : "right"}
            style={{ textAlignLast: isMobile ? "center" : "right" }}
          >
            {renderAboutUs("sobre_nosotros_apartado_2")}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
