import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpoint,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { sanityImage } from "@/lib/sanity.image";
import { IDataCategorias } from "@/typesSanity/docs/categorias";

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

      <Wrap justify="center" py={10}>
        {data &&
          data.images.map((e) => {
            return (
              <WrapItem key={data._id} cursor="pointer">
                <BlurCard
                  image={e.image.asset._ref}
                  title={e.title}
                  filter={e.isPage ? "" : e.title.toLowerCase()}
                  path={e.isPage ? e.page || "" : "/productos"}
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
  path: string;
}

const BlurCard = ({ image, title, filter, path }: ICardProp) => {
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
        pathname: path,
        query: filter.length > 0 ? { filter: filter } : {},
      }}
    >
      <Flex
        w={"400px"}
        h={"270px"}
        onMouseEnter={handleFlipStart}
        onMouseLeave={handleFlipEnd}
        position="relative"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        borderRadius="5px"
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
          borderRadius="5px"
          alt={title}
        />
      </Flex>
    </Link>
  );
};

export default CardCategory;
