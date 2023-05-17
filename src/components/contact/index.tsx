import { Container, Flex, Box, Wrap } from "@chakra-ui/react";

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
    <Container bg="#faf5f1" maxW="full" centerContent overflow="hidden" mt="30px" mb="30px">
      <Flex>
        <Box
          bg="#846a5a"
          color="white"
          borderRadius="none"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 16, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 10, sm: 3, md: 5, lg: 20 }}>
              <Detail isMobile={isMobile} />
              <Form isMobile={isMobile} />
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Contact;
