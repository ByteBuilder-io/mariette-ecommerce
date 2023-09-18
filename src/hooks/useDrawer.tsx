import React, { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

interface DraweProviderProps {
  children: React.ReactNode;
}

interface IDrawerProps {
  placement: "left" | "right" | "top" | "bottom";
  type: "nav" | "cart";
  size: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

interface IDrawerContext {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  drawerProps: IDrawerProps;
  setDrawerProps: (props: IDrawerProps) => void;
}

const DrawerContext = createContext<IDrawerContext>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  drawerProps: {
    placement: "left",
    type: "nav",
    size: "lg",
  },
  setDrawerProps: () => {},
});

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider: React.FC<DraweProviderProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerProps, setDrawerProps] = useState<IDrawerProps>({
    placement: "left",
    type: "nav",
    size: "lg",
  });

  return (
    <DrawerContext.Provider
      value={{ isOpen, onOpen, onClose, drawerProps, setDrawerProps }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
