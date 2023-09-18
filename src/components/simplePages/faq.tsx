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
import { IDataFaq } from "@/typesSanity/docs/faq";

const Faq = ({ dataFaq }: { dataFaq: IDataFaq }) => {
  const [data, setData] = useState<IDataFaq>(dataFaq);
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
                  {data.title}
                </Heading>
              </Box>
              <Box>
                <Text
                  textColor={"#836a59"}
                  fontSize="xl"
                  textAlign={"center"}
                  fontFamily={"heading"}
                >
                  {data.subtitle}
                </Text>
              </Box>
              <Box py={10} w={"100%"}>
                <CardFaq faqs={data.faqs} />
              </Box>
            </VStack>
          </Container>
          <Box
            backgroundColor={"#F9F9F9"}
            h="100%"
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

export default Faq;
