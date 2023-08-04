import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { IDataTyc } from "@/typesSanity/docs/tyc";
import CardTyc from "@/components/cards/cardTyc";
import CardAviso from "@/components/cards/cardAviso";

const Aviso = ({ dataAviso }: { dataAviso: IDataTyc }) => {
  const [data, setData] = useState<IDataTyc>(dataAviso);

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
                <Heading
                  textColor={"#836a59"}
                  fontFamily={"heading"}
                  textAlign={"center"}
                >
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
                <CardAviso content={data.content} />
              </Box>
            </VStack>
          </Container>
          <Box
            backgroundColor={"#f7fafc"}
            h={"100%"}
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

export default Aviso;
