import { Box, useColorModeValue, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface Props {
  content: string;
}

const CardTyc = ({ content }: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <Box
      borderWidth="1px"
      shadow={"lg"}
      rounded="md"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
      w={{ base: "100%", lg: "1000px" }}
      maxW={width}
    >
      <Box p={10} maxW={width - 50}>
        <Text textAlign={"justify"}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Text>
      </Box>
    </Box>
  );
};

export default CardTyc;
