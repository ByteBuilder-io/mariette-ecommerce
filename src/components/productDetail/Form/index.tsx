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
  Stack,
  VStack,
  Wrap,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Select from "react-select";

import { MdAdd, MdRemove } from "react-icons/md";

import { FaInstagram, FaFacebook } from "react-icons/fa";
import SocialButton from "../../commons/socialMedia";
import { dataGema, customStyles, d2 } from "./utils";
import BasicCheckBox from "@/components/filter/BasicCheckBox";
import ButtonOutline from "@/components/filter/ButtonOutline";
import { graphQLClient } from "@/lib/shopify";
import Cookies from "js-cookie";
import { useCounter } from "@/hooks/useContador";
import { useDrawer } from "@/hooks/useDrawer";
import useWindowDimensions from "@/hooks/useWindowDimensions";
declare var gtag: Function;

export interface IOptions {
  name: string;
  values: string[];
  _key: string;
  _type: string;
}

interface Props {
  options: IOptions[];
  idProduct: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  type: string;

  setAvailable: (data: boolean) => void;
}
interface MyMapInterface {
  [key: string]: string;
}

interface IDataQuery {
  name: string;
  value: string;
}

const Form = ({ options, idProduct, setValue, type, setAvailable }: Props) => {
  const myMap: MyMapInterface = options.reduce((prev, curr) => {
    return { ...prev, [curr.name]: curr.values[0] };
  }, {});

  let myDataquery: IDataQuery[] = [];
  options.map((e) => {
    myDataquery = [...myDataquery, { name: e.name, value: e.values[0] }];
  });

  const toast = useToast();
  const [quantity, setQuantity] = useState<number>(1);
  const [data, setData] = useState(myMap);
  const [dataQuery, setDataQuery] = useState<IDataQuery[]>(myDataquery);
  const { count, setCount, increment } = useCounter();
  const { isOpen, onOpen, onClose, drawerProps, setDrawerProps } = useDrawer();
  const [productName, setProductName] = useState<string>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();
  const [validateProduct, setValidateProduct] = useState<boolean>(false);

  useEffect(() => {
    if (width < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    async function fetchData() {
      if (dataQuery) {
        const selectedOptionsQuery = dataQuery
          .filter(
            (option) => option.name !== "Talla" && option.name !== "Color"
          )
          .map(
            (option) =>
              `{name: ${JSON.stringify(option.name)}, value: ${JSON.stringify(
                option.value
              )}}`
          )
          .join(", ");

        const query = `
          query {
            product(id: "${idProduct}") {
              variantBySelectedOptions(
                selectedOptions: [${selectedOptionsQuery}]
              ) {
                id
                priceV2 {
                  amount
                }
                product {
                  title
                }
              }
            }
          }
        `;
        // Utilizando el cliente GraphQL
        const data: any = await graphQLClient.request(query);

        if (data.product.variantBySelectedOptions === null) {
          setAvailable(false);
          setValue(0);
          setValidateProduct(true);
          return;
        }
        setProductName(data.product.variantBySelectedOptions.product.title);
        setValue(Number(data.product.variantBySelectedOptions.priceV2.amount));
        setValidateProduct(false);
      }
    }
    fetchData();
  }, [dataQuery]);

  useEffect(() => {
    async function fetchData() {
      if (dataQuery && data) {
        let myDataquery: IDataQuery[] = [];
        options.map((e) => {
          myDataquery = [...myDataquery, { name: e.name, value: data[e.name] }];
        });
        setDataQuery(myDataquery);
        const dq: any = await getLastPrice(idProduct, myDataquery);
        console.log(dq);
        if (dq.product.variantBySelectedOptions === null) {
          setAvailable(false);
          setValue(0);
          setValidateProduct(true);
          return;
        }
        setValue(Number(dq.product.variantBySelectedOptions.priceV2.amount));
        setValidateProduct(false);
      }
    }
    fetchData();
  }, [data]);
  const handleSelectChange = (event: any, id: string) => {
    setData({ ...data, [id]: event.value });
  };

  const handleChange = (value: any, id: any) => {
    setData({ ...data, [id]: value });
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity != 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    toast({
      title: "Product added to cart",
      status: "success",
      duration: 3000,
      isClosable: true,
      containerStyle: {
        backgroundColor: "#D7C0b4",
      },
    });
    let myDataquery: IDataQuery[] = [];
    options.map((e) => {
      myDataquery = [...myDataquery, { name: e.name, value: data[e.name] }];
    });
    setDataQuery(myDataquery);
    const dq: any = await getLastPrice(idProduct, myDataquery);
    const idCart = Cookies.get("idCart");
    const products = Cookies.get("products");
    const queryCart =
      idCart != undefined
        ? `
        mutation {
          checkoutLineItemsAdd(
            checkoutId: "${idCart}",
            lineItems: [
              {
                variantId: "${dq.product.variantBySelectedOptions.id}",
                quantity: ${quantity}
              },
            ]
          ) {
            checkout {
              id
              webUrl
            }
            checkoutUserErrors {
              field
              message
            }
          }
        }
    `
        : `
        mutation {
          checkoutCreate(input: {
            lineItems: [
              {
                variantId: "${dq.product.variantBySelectedOptions.id}",
                quantity: ${quantity}
              }
            ]
          }) {
            checkout {
              id
              webUrl
            }
            checkoutUserErrors {
              code
              message
            }
          }
        }
    `;
    const resultCart: any = await graphQLClient.request(queryCart);
    // if (resultCart.checkoutCreate.checkoutUserErrors.length != 0)
    //   return toast({
    //     title: "Hubo un error al actualizar el carrito, vuelva a intentarlo",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //     containerStyle: {
    //       backgroundColor: "#D7C0b4",
    //     },
    //   });

    if (idCart === undefined) {
      await Cookies.set("idCart", resultCart.checkoutCreate.checkout.id);
      await Cookies.set(
        "checkoutUrl",
        resultCart.checkoutCreate.checkout.webUrl
      );
    }
    const dataProduct = {
      id: dq.product.variantBySelectedOptions.id,
      product: productName,
      detail: data,
    };
    if (products === undefined) {
      const finalData = [dataProduct];
      await Cookies.set("products", JSON.stringify(finalData));
    } else {
      const finalData = [dataProduct, ...JSON.parse(products)];
      await Cookies.set("products", JSON.stringify(finalData));
    }
    increment();
    isOpen ? onClose() : onOpen();
    setDrawerProps({
      type: "cart",
      placement: "right",
      size: "lg",
    });

    gtag("event", "ads_conversion_Compra_1", {
      event_callback: function () {
        console.log("Evento de conversión enviado");
      },
      event_timeout: 2000,
    });
  };

  return (
    <Box pt="20px">
      {options.map((e) => {
        switch (e.name) {
          case "Metal":
            let metal: { label: string; value: string }[] = [];
            e.values.map((i) => {
              metal = [...metal, { label: i, value: i }];
            });
            let metalDefault = metal[0];
            return (
              <Box key={e._key} mb="15px" mt={5}>
                <Box mb="10px">
                  <Text fontWeight="bold" fontSize="14px">
                    Metal
                  </Text>
                </Box>
                <Select
                  defaultValue={metalDefault}
                  onChange={(value) => {
                    handleSelectChange(value, e.name);
                    metalDefault = value!;
                  }}
                  placeholder="Selecciona..."
                  styles={customStyles}
                  options={metal}
                />
              </Box>
            );
            break;
          case "Color":
            let color: { label: string; value: string }[] = [];
            e.values.map((i) => {
              color = [...color, { label: i, value: i }];
            });
            let defaultColor = color[0];
            return (
              <Box key={e._key} mb="15px" mt={5}>
                <Box mb="10px">
                  <Text fontWeight="bold" fontSize="14px">
                    Color del metal
                  </Text>
                </Box>
                <Select
                  defaultValue={defaultColor}
                  onChange={(value) => {
                    handleSelectChange(value, e.name);
                    defaultColor = value!;
                  }}
                  placeholder="Selecciona..."
                  styles={customStyles}
                  // @ts-ignore
                  options={color}
                />
              </Box>
            );
            break;
          case "Talla":
            return (
              <Box width={isMobile ? "auto" : "300px"}>
                <Box w="60px">
                  <Text fontWeight="bold" fontSize="14px" mb="10px">
                    Talla
                  </Text>
                </Box>
                <Box>
                  <Wrap spacing={2}>
                    {e.values.map((i) => {
                      return (
                        <ButtonOutline
                          key={i}
                          text={i}
                          data={data}
                          onClick={handleChange}
                        />
                      );
                    })}
                  </Wrap>
                </Box>
              </Box>
            );
            break;
          case "Gema":
            let gemaData: { label: string; value: string }[] = [];
            e.values.map((i) => {
              gemaData = [...gemaData, { label: i, value: i }];
            });
            let gema = gemaData[0];
            return (
              <Box key={e._key} mb="15px" mt={5}>
                <Box mb="10px">
                  <Text fontWeight="bold" fontSize="14px">
                    Gema
                  </Text>
                </Box>
                <Select
                  defaultValue={gema}
                  onChange={(value) => {
                    handleSelectChange(value, e.name);
                    gema = value!;
                  }}
                  placeholder="Selecciona..."
                  styles={customStyles}
                  options={gemaData}
                />
              </Box>
            );
            break;
        }
      })}
      <Box pt="10px">
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
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
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
          {/*<InputGroup width="50%">*/}
          {/*  <IconButton*/}
          {/*    aria-label="Agregar al carrito"*/}
          {/*    icon={<FaHeart />}*/}
          {/*    size="lg"*/}
          {/*    variant="outline"*/}
          {/*    onClick={handleAddToFavorites}*/}
          {/*  />*/}
          {/*</InputGroup>*/}
        </HStack>
      </Flex>
      {validateProduct ? (
        <Box pb={5}>
          <Alert
            status="info"
            w="237px"
            h="50px"
            fontSize="12px"
            bg="#997d6c"
            color={"white"}>
            <AlertIcon color={"white"} />
            Producto no disponible
          </Alert>
        </Box>
      ) : (
        <Button
          mb={4}
          onClick={handleAddToCart}
          borderRadius="5px"
          bg="#997d6c"
          color="white"
          w="237px"
          h="50px">
          AÑADIR AL CARRITO
        </Button>
      )}
      <Flex>
        <HStack spacing={2}>
          <SocialButton
            label={"instagrams"}
            href={"https://www.instagram.com/mariette.jewelry"}
            size={10}>
            <FaInstagram />
          </SocialButton>
          <SocialButton
            label={"facebook"}
            href={
              "https://www.facebook.com/profile.php?id=100081953648446&mibextid=LQQJ4d"
            }
            size={10}>
            <FaFacebook />
          </SocialButton>
        </HStack>
      </Flex>
    </Box>
  );
};

const getLastPrice = async (idProduct: string, myDataquery: IDataQuery[]) => {
  const selectedOptionsQuery = myDataquery
    .filter((option) => option.name !== "Talla" && option.name !== "Color")
    .map(
      (option) =>
        `{name: ${JSON.stringify(option.name)}, value: ${JSON.stringify(
          option.value
        )}}`
    )
    .join(", ");

  const query = `
          query {
            product(id: "${idProduct}") {
              variantBySelectedOptions(
                selectedOptions: [${selectedOptionsQuery}]
              ) {
                id
                priceV2 {
                  amount
                }
              }
            }
          }
        `;
  console.log(query);
  // Utilizando el cliente GraphQL
  return await graphQLClient.request(query);
};

export default Form;
