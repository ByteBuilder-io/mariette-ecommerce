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
import { ReactNode, useEffect, useState } from "react";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import { IoMdClose } from "react-icons/io";

import { checkboxTheme } from "./Checkbox";
import BadgeFilter from "./BadgeFilter";
import ButtonOutline from "./ButtonOutline";
import RangeSlider from "./RangePrice";
import BasicCheckBox from "./BasicCheckBox";
import BreadCrumb from "./BreadCrum";
import DrawerFilters from "./DrawerFilters";
import { d1, d2, d3, d4, colors } from "./utils";

const customTheme = extendTheme({
  components: {
    Checkbox: checkboxTheme,
  },
});

interface Props {
  children: ReactNode;
}

const Filter = ({ children }: Props) => {
  const { width, height } = useWindowDimensions();
  const [rango, setRango] = useState([100, 500]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(true);

  const handleChangeSlider = (nuevoRango: [number, number]) => {
    setRango(nuevoRango);
  };

  const handleFilterClose = () => {
    setIsOpenFilter(false);
  };

  const handleFilterOpen = () => {
    setIsOpenFilter(true);
  };

  const handleFilterOpenDrawer = () => {
    setIsOpenFilter(true);
  };

  const RenderFilters = () => {
    return (
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
    );
  };

  useEffect(() => {
    if (width < 992) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

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
        {isMobile && (
          <DrawerFilters isOpen={isOpenFilter} onClose={handleFilterClose}>
            <RenderFilters />
          </DrawerFilters>
        )}
        {isOpenFilter && !isMobile && (
          <Flex direction="column" align="left" flex="2">
            <Box pr="60px">
              <IoMdClose
                cursor="pointer"
                style={{ float: "right" }}
                onClick={handleFilterClose}
              />
            </Box>
            <RenderFilters />
          </Flex>
        )}
        <Stack spacing={{ base: "8", md: "4" }} flex="4">
          <BreadCrumb />
          {!isOpenFilter && !isMobile && (
              <BadgeFilter text="Filtros" isFilter onClick={handleFilterOpen} />
            )}
            {isMobile && (
              <BadgeFilter
                text="Filtros"
                isFilter
                onClick={handleFilterOpenDrawer}
              />
            )}
          <Stack direction="row" flexWrap="wrap" marginTop="10px !important">
            <BadgeFilter text="Talla: 7" />
            <BadgeFilter text="Anillos" />
            <BadgeFilter text="Oro" />
            <BadgeFilter text="Azul" />
            <BadgeFilter text="Hombre" />
          </Stack>
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Filter;
