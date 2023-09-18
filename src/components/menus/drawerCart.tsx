import { IDataNav } from "@/typesSanity/docs/nav";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { sanityImage } from "@/lib/sanity.image";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { SearchIcon } from "@chakra-ui/icons";
import NavLink from "@/components/menus/navLink";
import ShoppingCart from "@/components/cart";

interface IDrawerCart {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const DrawerCart = ({ isOpen, onOpen, onClose }: IDrawerCart) => {
  return (
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">
        <HStack>
          <IconButton
            variant="ghost"
            size="md"
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label="Open Menu"
            onClick={isOpen ? onClose : onOpen}
          />
          <Text mr="16px" color="#846a5a" fontWeight="semibold">
            CARRITO DE COMRPAS
          </Text>
        </HStack>
      </DrawerHeader>
      <DrawerBody bgColor={"#faf5f1"}>
        <ShoppingCart />
      </DrawerBody>
    </DrawerContent>
  );
};

export default DrawerCart;
