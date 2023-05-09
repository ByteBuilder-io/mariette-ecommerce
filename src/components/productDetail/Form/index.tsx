import {
  Box,
  HStack,
  Text,
  Select,
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

const Form = () => {
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Category 1");
  const handleQuantityChange = (event: any) => {
    setQuantity(event.target.value);
  };
  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
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
  };
  const handleAddToFavorites = () => {
    toast({
      title: "Product added to favorites",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const [value, setValue] = useState<any>(0);

  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  return (
    <Box pt="20px">
      <HStack pb="10px">
        <Box w="50px">
          <Text fontWeight="bold" fontSize="14px">
            Gema
          </Text>
        </Box>
        <Select
          fontSize="14px"
          mb={4}
          value={category}
          onChange={handleCategoryChange}
          placeholder="Select category"
          borderRadius="0px"
          w="218px"
        >
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </Select>
      </HStack>
      <HStack pb="10px">
        <Box w="50px">
          <Text fontWeight="bold" fontSize="14px">
            Metal
          </Text>
        </Box>
        <Select
          fontSize="14px"
          mb={4}
          value={category}
          onChange={handleCategoryChange}
          placeholder="Select category"
          borderRadius="0px"
          w="218px"
        >
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </Select>
      </HStack>
      <HStack pb="10px">
        <Box w="50px">
          <Text fontWeight="bold" fontSize="14px">
            Talla
          </Text>
        </Box>
        <Select
          fontSize="14px"
          mb={4}
          value={category}
          onChange={handleCategoryChange}
          placeholder="Select category"
          borderRadius="0px"
          w="218px"
        >
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </Select>
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
