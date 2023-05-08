import { Fragment, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Select,
  IconButton,
  useToast,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  HStack,
  InputLeftAddon,
  FormLabel,
  Grid,
} from "@chakra-ui/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import { FaHeart, FaShareAlt } from "react-icons/fa";
import { MdAdd, MdRemove } from "react-icons/md";

const ProductDetail = () => {
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

  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: any) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ x: 0, y: 0 });
  };

  return (
    <Grid
        templateColumns="40% 60%"
      templateRows={{ base: "auto", md: "1fr" }}
      gap={{ base: 4, md: 8 }}
      mt="50px"
      mb="50px"
    >
      <Box
        ml="60px"
        h="100%"
        gridRow={{ base: "1", md: "1" }}
        gridColumn={{ base: "1", md: "1" }}
      >
        <Box>
          <Image
            w="505px"
            h="337px"
            src="https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg"
            alt="Product image"
            transition="transform 0.2s ease-in-out"
        _hover={{
          transform: "scale(1.1)",
          cursor: "zoom-in",
        }}
        _active={{
          cursor: "zoom-in",
        }}
          />
        </Box>
        <Box mt="10px">
          <HStack spacing={4}>
            <Image
              w="114px"
              h="114px"
              src="https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg"
              alt="Product image"
            />
            <Image
              w="114px"
              h="114px"
              src="https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg"
              alt="Product image"
            />
            <Image
              w="114px"
              h="114px"
              src="https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg"
              alt="Product image"
            />
            <Image
              w="114px"
              h="114px"
              src="https://mariette.com.mx/wp-content/uploads/2023/03/AMIRA-4-scaled.jpg"
              alt="Product image"
            />
          </HStack>
        </Box>
      </Box>
      <Box
        h="100%"
        gridRow={{ base: "2", md: "1" }}
        gridColumn={{ base: "1 / -1", md: "2" }}
        display={{ base: "flex", md: "block" }}
        flexDirection={{ base: "column", md: "row" }}
        flexWrap="wrap"
      >
        <Box flex="1" mr="100px">
          <Text fontSize="2xl" fontWeight="semibold" mb={2}>
            Product Title
          </Text>
          <Text mb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
            magna non odio fringilla fermentum. Proin quis elit sem.
          </Text>
          <Text mb="8px" fontWeight="bold">
            Metal
          </Text>
          <Select
            mb={4}
            value={category}
            onChange={handleCategoryChange}
            placeholder="Select category"
          >
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
          </Select>
          <Text mb="8px" fontWeight="bold">
            Gema
          </Text>
          <Select
            mb={4}
            value={category}
            onChange={handleCategoryChange}
            placeholder="Select category"
          >
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
          </Select>
          <Text mb="8px" fontWeight="bold">
            Talla
          </Text>
          <Select
            mb={4}
            value={category}
            onChange={handleCategoryChange}
            placeholder="Select category"
          >
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
          </Select>
          <Text mb="8px" fontWeight="bold">
            Cantidad
          </Text>
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
                  />
                  <InputRightElement>
                    <IconButton
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
          >
            Añadir al carrito
          </Button>
          <Flex>
            <IconButton
              aria-label="Share on Facebook"
              icon={<FaShareAlt />}
              size="md"
              variant="outline"
              mr={2}
            />
            <IconButton
              aria-label="Share on Twitter"
              icon={<FaShareAlt />}
              size="md"
              variant="outline"
            />
          </Flex>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductDetail;
