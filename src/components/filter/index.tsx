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

interface IData {
  producto: string[];
  material: string[];
  talla: string[];
  rango_precio: string[];
  color: string[];
  categoria: string[];
}

const Filter = ({ children }: Props) => {
  const { width, height } = useWindowDimensions();
  const [rango, setRango] = useState([100, 500]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(true);
  const [data, setData] = useState<any>({
    producto: [],
    material: [],
    talla: [],
    rango_precio: [],
    color: [],
    categoria: [],
  });

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

  const handleCheckboxChange = (
    value: any,
    id:
      | "producto"
      | "material"
      | "rango_precio"
      | "talla"
      | "categoria"
      | "color"
  ) => {
    setData((prevData: any) => ({
      ...prevData,
      [id]: prevData[id].includes(value)
        ? prevData[id].filter((val: any) => val !== value)
        : [...prevData[id], value],
    }));
  };

  const renderBadges = (
    type:
      | "producto"
      | "material"
      | "categoria"
      | "rango_precio"
      | "talla"
      | "color"
  ) => {
    if (
      type === "producto" ||
      type === "material" ||
      type === "color" ||
      type === "categoria" ||
      type === "rango_precio"
    ) {
      const result = data[type].map((item: string, index: number) => {
        return <BadgeFilter text={item} key={index} />;
      });

      return result;
    }
    if (type === "talla") {
      const result = data.talla.map((item: string, index: number) => {
        return <BadgeFilter text={`Talla: ${item}`} key={index} />;
      });

      return result;
    }
  };

  console.log(data, "datadata");

  const RenderFilters = () => {
    return (
      <Stack spacing="6" mt="50px">
        <BasicCheckBox
          title="Producto"
          options={d1}
          id="producto"
          onClick={handleCheckboxChange}
          data={data}
        />
        <BasicCheckBox
          title="Material"
          options={d2}
          id="material"
          onClick={handleCheckboxChange}
          data={data}
        />
        <Text fontWeight="bold" fontSize="14px">
          Talla
        </Text>
        <CheckboxGroup>
          <Stack spacing="1">
            <ChakraProvider theme={customTheme}>
              <HStack direction="row" spacing={2}>
                <ButtonOutline
                  text="4"
                  data={data}
                  onClick={handleCheckboxChange}
                />
                <ButtonOutline
                  text="5"
                  data={data}
                  onClick={handleCheckboxChange}
                />
                <ButtonOutline
                  text="6"
                  data={data}
                  onClick={handleCheckboxChange}
                />
                <ButtonOutline
                  text="7"
                  data={data}
                  onClick={handleCheckboxChange}
                />
                <ButtonOutline
                  text="8"
                  data={data}
                  onClick={handleCheckboxChange}
                />
                <ButtonOutline
                  text="9"
                  data={data}
                  onClick={handleCheckboxChange}
                />
              </HStack>
            </ChakraProvider>
          </Stack>
        </CheckboxGroup>
        <BasicCheckBox
          title="Rango de precio"
          options={d3}
          id="rango_precio"
          onClick={handleCheckboxChange}
          data={data}
        />
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
                <Checkbox
                  variant={`circulasCustom${color.name}`}
                  size="md"
                  key={index}
                  colorScheme="red"
                  isChecked={data.color.includes(color.label)}
                  onChange={() => handleCheckboxChange(color.label, "color")}
                />
              ))}
            </HStack>
          </ChakraProvider>
        </Flex>
        <BasicCheckBox
          title="Categoria"
          options={d4}
          id="categoria"
          onClick={handleCheckboxChange}
          data={data}
        />
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
            {renderBadges("talla")}
            {renderBadges("producto")}
            {renderBadges("material")}
            {renderBadges("color")}
            {renderBadges("categoria")}
            {renderBadges("rango_precio")}
          </Stack>
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Filter;
