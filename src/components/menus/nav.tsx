import {
  Box,
  Flex,
  Image,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Heading,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Drawer,
  DrawerHeader,
  Spacer,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { IDataNav } from "@/typesSanity/nav";
import { sanityImage } from "@/lib/sanity.image";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const query = `*[_type == "navbar"]`;
  const [data, setData] = useState<IDataNav[]>();

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <Box
      px={4}
      boxShadow="lg"
      width="100%"
      zIndex={10}
      backgroundColor={"white"}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        <HStack spacing={8} alignItems="center">
          {data && (
            <Link href="/">
              <Image
                src={sanityImage(data[0].logo.asset._ref).url()}
                maxW="150px"
                cursor={"pointer"}
              />
            </Link>
          )}
          <HStack
            as="nav"
            spacing={1}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
          >
            {data &&
              data[0].links.map((e) => {
                if (!e.link.isSubmenu) {
                  return (
                    <NavLink
                      key={e._key}
                      name={e.title}
                      path={e.link.url!}
                      onClose={onClose}
                    />
                  );
                }
                return (
                  <Menu key={e._key} autoSelect={false} isLazy>
                    {({ isOpen, onClose }) => (
                      <>
                        <MenuButton
                          as={Button}
                          variant="ghost"
                          size="sm"
                          px={3}
                          py={1}
                          lineHeight="inherit"
                          fontSize="1em"
                          fontWeight="normal"
                          rounded="md"
                          height="auto"
                          _hover={{ color: "black", bg: "white" }}
                        >
                          <Flex alignItems="center">
                            <Text>{e.title}</Text>
                            <Icon
                              as={BiChevronDown}
                              h={5}
                              w={5}
                              ml={1}
                              transition="all .25s ease-in-out"
                              transform={isOpen ? "rotate(180deg)" : ""}
                            />
                          </Flex>
                        </MenuButton>
                        <MenuList zIndex={5} border="none">
                          {e.link.submenu!.map((link, index) => (
                            <MenuLink
                              key={index}
                              name={link.title}
                              path={link.url}
                              onClose={onClose}
                            />
                          ))}
                        </MenuList>
                      </>
                    )}
                  </Menu>
                );
              })}
          </HStack>
        </HStack>

        {!isOpen && (
          <IconButton
            variant="ghost"
            size="md"
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label="Open Menu"
            display={["inherit", "inherit", "none"]}
            onClick={isOpen ? onClose : onOpen}
          />
        )}
      </Flex>

      {/* Mobile Screen Links */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <HStack>
              <Box>
                {data && (
                  <Image
                    src={sanityImage(data[0].logo.asset._ref).url()}
                    maxW="150px"
                  />
                )}
              </Box>
              <Spacer />
              <IconButton
                variant="ghost"
                size="md"
                icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                aria-label="Open Menu"
                onClick={isOpen ? onClose : onOpen}
              />
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <Stack as="nav" spacing={2}>
              {data &&
                data[0].links.map((e) => {
                  if (!e.link.isSubmenu) {
                    return (
                      <NavLink
                        key={e._key}
                        name={e.title}
                        path={e.link.url!}
                        onClose={onClose}
                      />
                    );
                  }
                  return (
                    <Menu key={e._key} autoSelect={false} isLazy>
                      {({ isOpen, onClose }) => (
                        <>
                          <MenuButton
                            as={Button}
                            variant="ghost"
                            size="sm"
                            px={3}
                            py={1}
                            lineHeight="inherit"
                            fontSize="1em"
                            fontWeight="normal"
                            rounded="md"
                            height="auto"
                            _hover={{ color: "black", bg: "white" }}
                          >
                            <Flex alignItems="center">
                              <Text>{e.title}</Text>
                              <Icon
                                as={BiChevronDown}
                                h={5}
                                w={5}
                                ml={1}
                                transition="all .25s ease-in-out"
                                transform={isOpen ? "rotate(180deg)" : ""}
                              />
                            </Flex>
                          </MenuButton>
                          <MenuList zIndex={5} border="none">
                            {e.link.submenu!.map((link, index) => (
                              <MenuLink
                                key={index}
                                name={link.title}
                                path={link.url}
                                onClose={onClose}
                              />
                            ))}
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  );
                })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

// NavLink Component
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
    <Link
      href={path}
      px={3}
      py={1}
      lineHeight="inherit"
      rounded="md"
      onClick={() => onClose()}
    >
      <Text>{name}</Text>
    </Link>
  );
};

// Dropdown MenuLink Component
interface MenuLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem>
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};
