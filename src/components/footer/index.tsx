import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
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

import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";
import { IconType } from "react-icons";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="_blank"
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const query = `*[_type == "settings"]{footer}`;
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
      setData(data[0].footer);
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
                  src={sanityImage(data.logo.asset._ref).url()}
                  maxW="150px"
                  alt="logo"
                />
              )}
            </Box>
            <Text fontSize={"sm"}>{data ? data.derechos : ""}</Text>
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
