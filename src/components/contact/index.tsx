import {
  Container,
  Flex,
  Box,
  Wrap,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import Form from "./Form";
import Detail from "./Detail";

const Contact = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <>
      <Box bg="#846a5a" mt="80px" mb="80px">
        <Flex
          flexWrap={{ base: "wrap", md: "nowrap" }}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box w={{ base: "100%", md: "37%" }}>
            <Detail isMobile={isMobile} />
          </Box>
          <Box w={{ base: "100%", md: "63%" }}>
            <Form isMobile={isMobile} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Contact;
