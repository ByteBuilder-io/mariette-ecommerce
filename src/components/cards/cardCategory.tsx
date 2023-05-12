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
import { IDataTyc } from "@/typesSanity/tyc";
import { client } from "@/lib/sanity.client";
import { IDataCategirias } from "@/typesSanity/categorias";
import { sanityImage } from "@/lib/sanity.image";

const CardCategory = () => {
  const query = `*[_type == "categorias"]`;
  const [data, setData] = useState<IDataCategirias[]>();

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, []);
  console.log(data);
  return (
    <Container w={"100%"} maxW={"1400px"} py={10}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Heading textColor={"#836a59"} fontFamily={"heading"} size={"lg"}>
          Categorias
        </Heading>
      </Box>

      <Wrap spacing="30px" justify="center" py={10}>
        {data &&
          data.map((e) => {
            return (
              <WrapItem key={e._id} cursor="pointer">
                <BlurCard
                  image={e.image.asset._ref}
                  title={e.title}
                  filter={e.slug.current}
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
    <LinkBox>
      <Flex
        as={"a"}
        href={"/productos" + "?filter=" + filter}
        w="425.343px"
        h="200px"
        onMouseEnter={handleFlipStart}
        onMouseLeave={handleFlipEnd}
        position="relative"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {breakpoint == "base" ? (
          <Heading color={"black"} fontSize={"3xl"}>
            {title}
          </Heading>
        ) : (
          blur && (
            <Heading color={"black"} fontSize={"3xl"}>
              {title}
            </Heading>
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
        />
      </Flex>
    </LinkBox>
  );
};

export default CardCategory;
