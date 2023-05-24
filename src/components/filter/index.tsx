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
  Wrap,
  SimpleGrid,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import Select from "react-select";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import { IoMdClose } from "react-icons/io";

import { checkboxTheme } from "./Checkbox";
import BadgeFilter from "./BadgeFilter";
import ButtonOutline from "./ButtonOutline";
import BasicCheckBox from "./BasicCheckBox";
import BreadCrumb from "./BreadCrum";
import DrawerFilters from "./DrawerFilters";
import ProductCard from "../productDetail/ProductGrid/ProductCard";

import { useRouter } from "next/router";

import { d1, d2, d3, d4, customStyles } from "./utils";
import Loading from "../commons/Loading";

const customTheme = extendTheme({
  components: {
    Checkbox: checkboxTheme,
  },
});

interface Props {
  children?: ReactNode;
  dataProduct?: any;
  dataAll?: any;
}

interface IData {
  producto: string[];
  material: string[];
  talla: string[];
  rango_precio: string[];
  color: string[];
  categoria: string[];
}

const Filter = ({ children, dataProduct, dataAll }: Props) => {
  const router = useRouter();
  const { query } = router;

  const [loading, setLoading] = useState<boolean>(true);
  const { width, height } = useWindowDimensions();
  const [rango, setRango] = useState([100, 500]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(true);
  const [isOpenFilterMovil, setIsOpenFilterMovil] = useState<boolean>(false);
  const [dataProductRender, setDataProductRender] = useState(dataProduct);
  const [data, setData] = useState<any>({
    producto: [],
    material: [],
    talla: [],
    rango_precio: [],
    color: [],
    categoria: [],
    gema: [],
  });

  const handleFilterCloseMovil = () => {
    setIsOpenFilterMovil(false);
  };

  const handleFilterClose = () => {
    setIsOpenFilter(false);
  };

  const handleFilterOpen = () => {
    setIsOpenFilter(true);
  };

  const handleFilterOpenDrawer = () => {
    setIsOpenFilterMovil(true);
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
      | "gema",
    event?: any
  ) => {
    setData((prevData: any) => ({
      ...prevData,
      [id]: prevData[id].includes(value)
        ? prevData[id].filter((val: any) => val !== value)
        : [...prevData[id], value],
    }));
    return false;
  };

  const renderBadges = (
    type:
      | "producto"
      | "material"
      | "categoria"
      | "rango_precio"
      | "talla"
      | "color"
      | "gema"
  ) => {
    if (
      type === "producto" ||
      type === "material" ||
      type === "color" ||
      type === "categoria" ||
      type === "rango_precio" ||
      type === "gema"
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

  const handleSelectChange = (selected: any) => {
    setData({
      ...data,
      gema: selected
    })
  };

  const RenderFilters = () => {
    return (
      <Stack spacing="6" mt="50px">
        <BasicCheckBox
          title="Categoria"
          options={d1}
          id="producto"
          onClick={handleCheckboxChange}
          data={data}
          dataAll={dataAll}
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
              <Wrap spacing={2}>
                <ButtonOutline
                  text="4"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="4.5"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="5"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="5.5"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="6"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="6.5"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="7"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="7.5"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="8"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="8.5"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
                <ButtonOutline
                  text="9"
                  data={data}
                  onClick={handleCheckboxChange}
                  isFilter
                />
              </Wrap>
            </ChakraProvider>
          </Stack>
        </CheckboxGroup>
        <Text fontWeight="bold" fontSize="14px">
          Gema
        </Text>
        <Select
          value={data.gema}
          isMulti
          name="gema"
          options={d4}
          className="basic-multi-select"
          classNamePrefix="select"
          closeMenuOnSelect={false}
          styles={customStyles}
          onChange={handleSelectChange}
        />
        {/* <BasicCheckBox
          title="Gema"
          options={d4}
          id="gema"
          onClick={handleCheckboxChange}
          data={data}
        /> */}
        {/* <Text fontWeight="bold" fontSize="14px">
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
        </Flex> */}
      </Stack>
    );
  };

  const filterByMaterial = (material: string[], filteredData: any) => {
    const result = filteredData.filter((item: any) =>
      item.variants.some((variant: any) =>
        material.includes(variant.data.option1)
      )
    );
    setDataProductRender(result);
  };

  const filterByTalla = (talla: string[], filteredData: any) => {
    const result = filteredData.filter((item: any) =>
      item.variants.some((variant: any) => talla.includes(variant.data.option2))
    );
    setDataProductRender(result);
  };

  const filterByGema = (gema: { value: string}[], filteredData: any) => {
    const gemaFormat = gema.map((item: {value: string}) => {
      return item.value
    })

    const resultado = filteredData.filter((item: any) => {
      const allOptionValues = item.options.flatMap(
        (option: any) => option.values
      );
      return allOptionValues.some((value: any) => gemaFormat.includes(value));
    });

    setDataProductRender(resultado);
  };

  const getCountFilters = () => {
    const mergedArray = data.producto.concat(data.talla, data.material);
    return mergedArray.length;
  };

  const handleResetFilters = () => {
    setData({
      producto: [],
      material: [],
      talla: [],
      rango_precio: [],
      color: [],
      categoria: [],
    });
  };

  useEffect(() => {
    const filterValues = data.producto;
    const filteredData = dataAll.filter((item: any) =>
      filterValues.includes(item.productType)
    );

    if (filteredData.length === 0) {
      setDataProductRender(dataAll);
    } else {
      setDataProductRender(filteredData);
    }

    if (data.material.length > 0) {
      filterByMaterial(
        data.material,
        filteredData.length === 0 ? dataAll : filteredData
      );
    }

    if (data.talla.length > 0) {
      filterByTalla(
        data.talla,
        filteredData.length === 0 ? dataAll : filteredData
      );
    }

    if (data.gema.length > 0) {
      filterByGema(
        data.gema,
        filteredData.length === 0 ? dataAll : filteredData
      );
    }
  }, [data, dataAll]);

  useEffect(() => {
    if (query.filter) {
      const textoCapitalizado =
        query.filter.toString().charAt(0).toUpperCase() +
        query.filter.toString().slice(1);

      const producto = [...data.producto, textoCapitalizado];
      setData({
        ...data,
        producto: [producto[producto.length - 1]],
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (width < 992) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  if (loading) {
    return <Loading />;
  }

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
          <DrawerFilters
            isOpen={isOpenFilterMovil}
            onClose={handleFilterCloseMovil}
          >
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
          <Text fontWeight="200">
            Resultados de la busqueda: {dataProductRender.length}
          </Text>
          {getCountFilters() > 0 && (
            <Text
              fontWeight="semibold"
              fontSize="12px"
              mt="-2px !important"
              mb="-2px !important"
              cursor="pointer"
              color="#846a5a"
              onClick={handleResetFilters}
            >
              Limpiar filtros
            </Text>
          )}
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {loading && <Loading />}
            {dataProductRender && dataProductRender.length > 0 && (
              <ProductCard
                products={dataProductRender}
                totalRows={dataProductRender.length / 4}
                loading={loading}
              />
            )}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Filter;
