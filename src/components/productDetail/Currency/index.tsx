import { Box, Text } from "@chakra-ui/react";

interface ContainerProps {
  value: number;
}

const Currency = (ContainerProps: ContainerProps) => {
  const { value } = ContainerProps;
  const formattedAmount = value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: "symbol",
  });

  const format = formattedAmount.replace("$", "");

  return (
    <Box display="inline-flex" alignItems="baseline" mb="20px">
      <Text fontWeight="bold" mr="7px">
        $
      </Text>
      <Text>{format}</Text>
    </Box>
  );
};

export default Currency;
