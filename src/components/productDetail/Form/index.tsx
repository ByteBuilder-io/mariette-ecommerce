import {
  Box,
  HStack,
  Text,
  Flex,
  InputGroup,
  InputLeftElement,
  IconButton,
  Input,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Select from "react-select";

import { FaHeart } from "react-icons/fa";
import { MdAdd, MdRemove } from "react-icons/md";

import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";
import SocialButton from "../../commons/socialMedia";
import { dataGema, customStyles, d2 } from "./utils";
import BasicCheckBox from "@/components/filter/BasicCheckBox";
import ButtonOutline from "@/components/filter/ButtonOutline";

const Form = () => {
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [gema, setGema] = useState("");
  const [value, setValue] = useState<any>(0);
  const [data, setData] = useState({
    gema: "",
    material: [],
    talla: [],
    cantidad: 0,
  });

  const handleQuantityChange = (event: any) => {
    setQuantity(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    setGema(event);
  };

  const handleChange = (
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

  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Product added to cart",
      status: "success",
      duration: 3000,
      isClosable: true,
      containerStyle: {
        backgroundColor: "#D7C0b4",
      },
    });
    const obj = {
      ...data,
      cantidad: quantity,
      gema: gema,
    };
    console.log(obj, "obj");
  };

  const handleAddToFavorites = () => {
    toast({
      title: "Product added to favorites",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box pt="20px">
      <Box mb="10px">
        <Text fontWeight="bold" fontSize="14px">
          Gema
        </Text>
      </Box>
      <Select
        value={gema}
        onChange={handleCategoryChange}
        placeholder="Selecciona..."
        styles={customStyles}
        options={dataGema}
      />
      <BasicCheckBox
        title="Material"
        options={d2}
        custom
        id="material"
        onClick={handleChange}
        data={data}
      />
      <Box w="60px">
        <Text fontWeight="bold" fontSize="14px" mb="10px">
          Talla
        </Text>
      </Box>
      <HStack direction="row" spacing={2}>
        <ButtonOutline text="4" data={data} onClick={handleChange} />
        <ButtonOutline text="5" data={data} onClick={handleChange} />
        <ButtonOutline text="6" data={data} onClick={handleChange} />
        <ButtonOutline text="7" data={data} onClick={handleChange} />
        <ButtonOutline text="8" data={data} onClick={handleChange} />
        <ButtonOutline text="9" data={data} onClick={handleChange} />
      </HStack>
      <Box pt="40px">
        <Text mb="8px" fontWeight="bold" fontSize="14px">
          Cantidad
        </Text>
      </Box>
      <Flex mb={4}>
        <HStack spacing={4}>
          <InputGroup width="50%">
            <InputGroup size="lg">
              <InputLeftElement>
                <IconButton
                  aria-label="Decrease value"
                  icon={<MdRemove />}
                  onClick={handleDecrease}
                />
              </InputLeftElement>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                textAlign="center"
                fontSize="14px"
              />
              <InputRightElement>
                <IconButton
                  fontSize="14px"
                  aria-label="Increase value"
                  icon={<MdAdd />}
                  onClick={handleIncrease}
                />
              </InputRightElement>
            </InputGroup>
          </InputGroup>
          <InputGroup width="50%">
            <IconButton
              aria-label="Agregar al carrito"
              icon={<FaHeart />}
              size="lg"
              variant="outline"
              onClick={handleAddToFavorites}
            />
          </InputGroup>
        </HStack>
      </Flex>
      <Button
        mb={4}
        onClick={handleAddToCart}
        borderRadius="0px"
        bg="#997d6c"
        color="white"
        w="237px"
        h="50px"
        fontSize="12px"
      >
        AÑADIR AL CARRITO
      </Button>
      <Flex>
        <HStack spacing={2}>
          <SocialButton label={"instagrams"} href={"#"} size={10}>
            <FaInstagram />
          </SocialButton>
          <SocialButton label={"facebook"} href={"#"} size={10}>
            <FaFacebook />
          </SocialButton>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Form;
