import { Badge, Box, Text } from "@chakra-ui/react";
import { BsFilterRight } from "react-icons/bs";

interface ContainerProps {
  text: string;
  onClick?: () => void;
  isFilter?: boolean;
}

const BadgeFilter = (props: ContainerProps) => {
  const { text, onClick, isFilter } = props;

  return (
    <Box mb="10px">
      <Badge
        variant="outline"
        borderColor="gray.500"
        borderRadius="12px"
        cursor="pointer"
        position="relative"
        pr="20px"
        onClick={onClick}
        bg={!isFilter ? "gray.100" : ""}
      >
        <Text
          pl="8px"
          pt="4px"
          pb="4px"
          pr="5px"
          fontWeight="light"
          textTransform="none"
        >
          {text}
        </Text>
        <Box
          position="absolute"
          top="0"
          right="0"
          h="100%"
          display="flex"
          alignItems="center"
          pr="8px"
          fontSize="sm"
          color="gray.500"
          cursor="pointer"
          fontWeight="light"
        >
          {isFilter ? <BsFilterRight /> : "x"}
        </Box>
      </Badge>
    </Box>
  );
};

export default BadgeFilter;
