import { useState, useEffect } from "react";
import { client } from "@/lib/sanity.client";
import {
  chakra,
  Box,
  Stack,
  Link,
  HStack,
  Text,
  Container,
  Icon,
  Avatar,
  Tooltip,
  StackProps,
  Divider,
  useColorModeValue,
  CardBody,
  Card,
  IconButton,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { sanityImage } from "@/lib/sanity.image";

export interface SanityBody {
  _createAt: string;
  _id: string;
  _rev: string;
  _updateAt: string;
}

interface ISlug {
  _type: string;
  current: string;
}

interface IImage {
  _ref: string;
  _type: string;
}

interface IDataTest extends SanityBody {
  name: string;
  slug: ISlug;
  image: {
    _type: string;
    asset: IImage;
  };
  bio: string;
}

const Home = () => {
  const query = `*[_type == "test"]`;
  const [data, setData] = useState<IDataTest[]>();

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      console.log(data, "////////");
      setData(data);
    }

    fetchData();
  }, []);

  if (data === null) {
    return <p>Cargando...</p>;
  }

  return (
    <Box w={"100%"}>
      <Container
        maxW={"1200px"}
        justifyContent="center"
        alignItems="center"
        py={{ base: 5, sm: 20 }}
      >
        <Wrap p={4} w="100%">
          {data &&
            data.map((e) => {
              return (
                <WrapItem key={e._id}>
                  <CardTest
                    name={e.name}
                    bio={e.bio}
                    image={e.image.asset._ref}
                  />
                </WrapItem>
              );
            })}
        </Wrap>
      </Container>
    </Box>
  );
};

interface ICard {
  name: string;
  bio: string;
  image: string;
}

const CardTest = (props: ICard) => {
  return (
    <Card maxW="sm">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={props.name} src={sanityImage(props.image).url()} />

            <Box>
              <Heading size="sm">{props.name}</Heading>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{props.bio}</Text>
      </CardBody>
    </Card>
  );
};

export default Home;
