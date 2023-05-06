import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import CardFaq from "@/components/cards/cardFaq";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { IDataFaq } from "@/typesSanity/faq";

const FAQ = () => {
  const query = `*[_type == "faqPage"]`;
  const [data, setData] = useState<IDataFaq[]>();

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      {data && (
        <>
          <Container
            py={10}
            maxW="1200px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <VStack>
              <Box>
                <Heading textColor={"#836a59"} fontFamily={"heading"}>
                  {data[0].title}
                </Heading>
              </Box>
              <Box>
                <Text
                  textColor={"#836a59"}
                  fontSize="xl"
                  textAlign={"center"}
                  fontFamily={"heading"}
                >
                  {data[0].subtitle}
                </Text>
              </Box>
              <Box py={10} w={"100%"}>
                <CardFaq faqs={data[0].faqs} />
              </Box>
            </VStack>
          </Container>
          <Box
            backgroundColor={"#faf5f1"}
            h={300}
            position={"absolute"}
            top={0}
            left={0}
            w="100%"
            zIndex={-2}
          />
        </>
      )}
    </>
  );
};

export default FAQ;
