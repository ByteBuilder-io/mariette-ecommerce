import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DrawerFiltersT = (props: ContainerProps) => {
  const { isOpen, onClose, children } = props;

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text fontFamily="Castoro Titling">Filtros</Text>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>
          <Button
            color="white"
            borderRadius="0px"
            w="100%"
            bg="#997d6c"
            onClick={onClose}
          >
            <Text fontWeight="semibold" fontSize="12px">
              APLICAR FILTROS
            </Text>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerFiltersT;
