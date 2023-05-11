import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  HStack,
  Stack,
  Text,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import { useState } from "react";

import { checkboxTheme } from "./Checkbox";
import BadgeFilter from "./BadgeFilter";
import ButtonOutline from "./ButtonOutline";
import RangeSlider from "./RangePrice";
import BasicCheckBox from "./BasicCheckBox";
import BreadCrumb from "./BreadCrum";
import { d1, d2, d3, d4, colors } from "./utils"

const customTheme = extendTheme({
  components: {
    Checkbox: checkboxTheme,
  },
});

const Filter = () => {
  const [rango, setRango] = useState([100, 500]);

  const handleChangeSlider = (nuevoRango: [number, number]) => {
    setRango(nuevoRango);
  };

  return (
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
        spacing={{ base: "8", md: "4" }}
      >
        <Flex direction="column" align="left" flex="2">
          <BreadCrumb />
          <Stack spacing="6" mt="50px">
            <BasicCheckBox title="Producto" options={d1} />
            <BasicCheckBox title="Material" options={d2} />
            <Text fontWeight="bold" fontSize="14px">
              Talla
            </Text>
            <CheckboxGroup>
              <Stack spacing="1">
                <ChakraProvider theme={customTheme}>
                  <HStack direction="row" spacing={2}>
                    <ButtonOutline text="4" />
                    <ButtonOutline text="5" />
                    <ButtonOutline text="6" />
                    <ButtonOutline text="7" />
                    <ButtonOutline text="8" />
                    <ButtonOutline text="9" />
                  </HStack>
                </ChakraProvider>
              </Stack>
            </CheckboxGroup>
            <BasicCheckBox title="Rango de precio" options={d3} />
            <Box w="200px">
              <Flex justifyContent="space-between">
                <Text fontSize="14px">Desde: ${rango[0]}</Text>
                <Text fontSize="14px">Hasta: ${rango[1]}</Text>
              </Flex>
              <RangeSlider
                defaultValue={[100, 500]}
                min={0}
                max={1000}
                onChange={handleChangeSlider}
              />
            </Box>
            <Text fontWeight="bold" fontSize="14px">
              Color
            </Text>
            <Flex alignItems="center" mb="4">
              <ChakraProvider theme={customTheme}>
                <HStack direction="row" spacing={2}>
                  {colors.map((color, index) => (
                    <Checkbox variant="circulasCustom" size="md" key={index} />
                  ))}
                </HStack>
              </ChakraProvider>
            </Flex>
            <BasicCheckBox title="Categoria" options={d4} />
          </Stack>
        </Flex>
        <Stack spacing={{ base: "8", md: "4" }} flex="4">
          <Stack direction="row">
            <BadgeFilter text="Talla: 7" />
            <BadgeFilter text="Anillos" />
            <BadgeFilter text="Oro" />
            <BadgeFilter text="Azul" />
            <BadgeFilter text="Hombre" />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Filter;
