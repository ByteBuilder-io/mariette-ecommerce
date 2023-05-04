import { useState, useEffect } from "react";
import { client } from "@/lib/sanity.client";
import {
  Box,
  Text,
  Avatar,
  CardBody,
  Card,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { sanityImage } from "@/lib/sanity.image";
import Navbar from "@/components/menus/nav";
import Footer from "@/components/footer";
import Hero from "@/components/hero";

const Home = () => {
  return (
    <Box w={"100%"}>
      <Navbar />
      <Hero />
      <Footer />
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

// <Container
//     maxW={"1200px"}
//     justifyContent="center"
//     alignItems="center"
//     py={{ base: 5, sm: 20 }}
// >
//   <Wrap p={4} w="100%">
//     {data &&
//         data.map((e) => {
//           return (
//               <WrapItem key={e._id}>
//                 <CardTest
//                     name={e.name}
//                     bio={e.bio}
//                     image={e.image.asset._ref}
//                 />
//               </WrapItem>
//           );
//         })}
//   </Wrap>
// </Container>
export default Home;
