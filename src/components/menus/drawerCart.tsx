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
          <Heading fontSize="2xl" fontFamily={"Castoro"}>
            Carrito de compras
          </Heading>
        </HStack>
      </DrawerHeader>
      <DrawerBody>
        <ShoppingCart />
      </DrawerBody>
    </DrawerContent>
  );
};

export default DrawerCart;
