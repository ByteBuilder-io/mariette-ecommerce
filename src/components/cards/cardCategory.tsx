import {
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  keyframes,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  useBreakpoint,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IDataTyc } from "@/typesSanity/docs/tyc";
import { client } from "@/lib/sanity.client";
import { IDataCategorias } from "@/typesSanity/docs/categorias";
import { sanityImage } from "@/lib/sanity.image";
import Link from "next/link";

interface ICategoryProps {
  dataCategory: IDataCategorias;
}

const CardCategory = ({ dataCategory }: ICategoryProps) => {
  const [data, setData] = useState<IDataCategorias>(dataCategory);

  return (
    <Container w={"100%"} maxW={"1400px"} py={10}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Heading textColor={"#836a59"} fontFamily={"heading"} size={"lg"}>
          Categorias
        </Heading>
      </Box>

      <Wrap spacing="30px" justify="center" py={10}>
        {data &&
          data.images.map((e) => {
            return (
              <WrapItem key={data._id} cursor="pointer">
                <BlurCard
                  image={e.image.asset._ref}
                  title={e.title}
                  filter={e.title.toLowerCase()}
                />
              </WrapItem>
            );
          })}
      </Wrap>
    </Container>
  );
};

interface ICardProp {
  image: string;
  title: string;
  filter: string;
}

const BlurCard = ({ image, title, filter }: ICardProp) => {
  const breakpoint = useBreakpoint();
  const [blur, setBlur] = useState(false);

  const handleFlipStart = () => {
    setBlur(true);
  };

  const handleFlipEnd = () => {
    setBlur(false);
  };

  return (
    <Link
      href={{
        pathname: "/productos",
        query: { filter: filter },
      }}
    >
      <Flex
        w="425px"
        h="200px"
        onMouseEnter={handleFlipStart}
        onMouseLeave={handleFlipEnd}
        position="relative"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {breakpoint == "base" ? (
          <Text
            fontSize="3xl"
            align="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontFamily="Castoro Titling"
            pl="35px"
            pr="35px"
          >
            {title}
          </Text>
        ) : (
          blur && (
            <Text
              fontSize="3xl"
              align="center"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontFamily="Castoro Titling"
              pl="35px"
              pr="35px"
            >
              {title}
            </Text>
          )
        )}

        <Image
          position={"absolute"}
          zIndex={-1}
          src={sanityImage(image).url()}
          className="fade-out-hover"
          opacity={{ base: 0.5, lg: blur ? 0.3 : 1 }}
          transition="opacity 0.2s ease"
          w="400px"
          h="200px"
          alt={title}
        />
      </Flex>
    </Link>
  );
};

export default CardCategory;
