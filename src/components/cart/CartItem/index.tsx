import {
  CloseButton,
  Flex,
  Link,
  Select,
  SelectProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";

type CartItemProps = {
  isGiftWrapping?: boolean;
  name: string;
  description: string;
  quantity: number;
  price: string;
  currency: string;
  imageUrl: string;
  onChangeQuantity: (quantity: number, idProduct: string) => Promise<void>;
  onClickGiftWrapping?: () => void;
  onClickDelete: (productId: string, variantId: string) => Promise<void>;
  idProduct: string;
  variantId: string;
};

const QuantitySelect = (props: SelectProps) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      {...props}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </Select>
  );
};

const CartItem = (props: CartItemProps) => {
  const {
    isGiftWrapping,
    name,
    description,
    quantity,
    imageUrl,
    currency,
    price,
    idProduct,
    onChangeQuantity,
    onClickDelete,
    variantId,
  } = props;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
      borderWidth="1px"
      rounded="lg"
      padding="2"
      width="full"
      bgColor={"white"}>
      <CartProductMeta
        name={name}
        description={description}
        image={imageUrl}
        isGiftWrapping={isGiftWrapping}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity(+e.currentTarget.value, idProduct);
          }}
        />
        <PriceTag price={Number(price)} currency={currency} />

        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => {
            onClickDelete(idProduct, variantId);
          }}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}>
        <Link
          fontSize="sm"
          textDecor="underline"
          onClick={() => {
            onClickDelete(idProduct, variantId);
          }}>
          Eliminar
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity(+e.currentTarget.value, idProduct);
          }}
        />
        <PriceTag price={Number(price)} currency={currency} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
