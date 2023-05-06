import { Box, useColorModeValue } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

const CardTyc = ({ content }: Props) => {
  return (
    <Box
      borderWidth="1px"
      shadow={"lg"}
      rounded="md"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
      w={{ base: "100%", sm: "1000px" }}
      minW="100%"
    >
      <Box p={10}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </Box>
    </Box>
  );
};

export default CardTyc;
