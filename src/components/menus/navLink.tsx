import { Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

interface NavLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const NavLink = ({ name, path, onClose }: NavLinkProps) => {
  const link = {
    bg: useColorModeValue("gray.200", "gray.700"),
    color: useColorModeValue("blue.500", "blue.200"),
  };

  return (
    <>
      {path && (
        <Link href={"/" + path!} onClick={() => onClose()}>
          <Text mr="16px" color="#846a5a" fontWeight="semibold">
            {name}
          </Text>
        </Link>
      )}
    </>
  );
};

export default NavLink;
