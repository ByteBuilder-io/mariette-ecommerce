import {
  Box,
  useColorModeValue,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
  Text,
} from "@chakra-ui/react";
import { IFaqs } from "@/typesSanity/faq";
import ReactMarkdown from "react-markdown";

interface Props {
  faqs: IFaqs[];
}

const CardFaq = ({ faqs }: Props) => {
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
      <Accordion defaultIndex={[0]} allowToggle>
        {faqs &&
          faqs.map((e) => {
            return (
              <AccordionItem key={e._key}>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontFamily={"body"}>{e.title}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box p={3}>
                    <ReactMarkdown>{e.content}</ReactMarkdown>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
      </Accordion>
    </Box>
  );
};

export default CardFaq;
