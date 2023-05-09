import { ReactNode } from "react";
import {
    chakra,
    VisuallyHidden,
    useColorModeValue,
  } from "@chakra-ui/react";

const SocialButton = ({
  children,
  label,
  href,
  size
}: {
  children: ReactNode;
  label: string;
  href: string;
  size?: number
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={size ? size :8}
      h={size ? size :8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="_blank"
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default SocialButton