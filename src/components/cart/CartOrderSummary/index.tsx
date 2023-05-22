import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "../CartItem/PriceTag";
import Cookies from "js-cookie";

type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

interface IProps {
  total: string;
}

const CartOrderSummary = ({ total }: IProps) => {
  const checkoutUrl = Cookies.get("checkoutUrl");
  return (
    <Stack
      spacing="8"
      borderWidth="1px"
      rounded="lg"
      padding="8"
      width="full"
      bgColor={"white"}
    >
      <Heading size="md">Resumen del pedido</Heading>

      <Stack spacing="6">
        {/*<OrderSummaryItem label="Subtotal" value={formatPrice(597)} />*/}
        {/*<OrderSummaryItem label="Envio + Tax">*/}
        {/*  <Link href="#" textDecor="underline">*/}
        {/*    Calcular Envio*/}
        {/*  </Link>*/}
        {/*</OrderSummaryItem>*/}
        {/*<OrderSummaryItem label="Codigo de cupon">*/}
        {/*  <Link href="#" textDecor="underline">*/}
        {/*    Agregar*/}
        {/*  </Link>*/}
        {/*</OrderSummaryItem>*/}
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold" color="#846a5a">
            {formatPrice(Number(total))} + IVA
          </Text>
        </Flex>
      </Stack>
      <Button
        bg="#997d6c"
        color="white"
        borderRadius="0px"
        size="lg"
        fontSize="md"
        as={"a"}
        href={checkoutUrl}
        target={"_blank"}
        rightIcon={<FaArrowRight />}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
