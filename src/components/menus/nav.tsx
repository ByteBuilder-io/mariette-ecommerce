import {
  Box,
  Flex,
  Image,
  HStack,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  Drawer,
  Container,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { IDataNav } from "@/typesSanity/docs/nav";
import { sanityImage } from "@/lib/sanity.image";
import { BiCartAlt } from "react-icons/bi";
import { IconToInput } from "@/components/inputs/searchInput";
import Link from "next/link";
import DrawerNav from "@/components/menus/drawerNav";
import NavLink from "@/components/menus/navLink";
import DrawerCart from "@/components/menus/drawerCart";
import { useCounter } from "@/hooks/useContador";
import Cookies from "js-cookie";
import { graphQLClient } from "@/lib/shopify";
import { IDataCart } from "@/components/cart";
import { title } from "process";
import { number } from "prop-types";

interface IDrawerProps {
  placement: "right" | "left";
  type: "nav" | "cart";
  size: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { count, setCount } = useCounter();

  const query = `
    *[_type == "settings"]{
      'logo': navbar.logo,
        'links': navbar.links[]{
          ...,
        'dataUrl': *[_id == ^.link.url._ref]{
            'url': slug.current
          }[0]
        }
    }
  `;
  const [data, setData] = useState<IDataNav>();
  const [drawerProps, setDrawerProps] = useState<IDrawerProps>({
    placement: "left",
    type: "nav",
    size: "lg",
  });
  const [dataCart, setDataCart] = useState<IDataCart>();

  useEffect(() => {
    async function fetchData() {
      const idCart = Cookies.get("idCart");
      console.log(idCart);
      if (idCart) {
        const s = `
          query{
            node(
              id: "${idCart}"
            ) {
              ... on Checkout {
                id
                lineItems(first: 10) {
                  edges {
                    node {
                      id
                      title
                      quantity
                      variant {
                        id
                        title
                        image {
                          originalSrc
                        }
                        priceV2 {
                          amount
                        }
                      }
                    }
                  }
                }
                totalPriceV2 {
                  amount
                }
              }
            }
          }
        `;

        // Utilizando el cliente GraphQL
        const dataCart: IDataCart = await graphQLClient.request(s);
        setDataCart(dataCart);
        setCount(dataCart.node.lineItems.edges.length);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data[0]);
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
      <Container maxW={"1400px"}>
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
        >
          <HStack spacing={8} alignItems="center" ml={{ base: 0, lg: 10 }}>
            {data && (
              <Link href="/" passHref legacyBehavior>
                <Image
                  src={sanityImage(data.logo.asset._ref).url()}
                  maxW="150px"
                  cursor={"pointer"}
                  alt="img"
                />
              </Link>
            )}
          </HStack>
          <HStack
            as="nav"
            spacing={1}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
          >
            {data &&
              data.links.map((e) => {
                if (!e.link.isSubmenu) {
                  return (
                    <NavLink
                      key={e._key}
                      name={e.title}
                      path={e.dataUrl.url}
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

            <HStack spacing={5} pr={10}>
              <IconToInput />
              <Box>
                <Flex alignItems="center">
                  <Box position="relative">
                    <Icon
                      as={BiCartAlt}
                      boxSize={6}
                      cursor={"pointer"}
                      onClick={() => {
                        isOpen ? onClose() : onOpen();
                        setDrawerProps({
                          type: "cart",
                          placement: "right",
                          size: "lg",
                        });
                      }}
                    />
                    <Box
                      position="absolute"
                      top="-5px"
                      right="-5px"
                      w="16px"
                      h="16px"
                      bg="#a47e6c"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="10px"
                      fontWeight="bold"
                      color="white"
                    >
                      {count}
                    </Box>
                  </Box>
                </Flex>
                {/*<Icon*/}
                {/*  as={BiCartAlt}*/}
                {/*  boxSize={6}*/}
                {/*  cursor={"pointer"}*/}
                {/*  onClick={() => {*/}
                {/*    isOpen ? onClose() : onOpen();*/}
                {/*    setDrawerProps({*/}
                {/*      type: "cart",*/}
                {/*      placement: "right",*/}
                {/*      size: "lg",*/}
                {/*    });*/}
                {/*  }}*/}
                {/*/>*/}
              </Box>
            </HStack>
          </HStack>

          <HStack display={["inherit", "inherit", "none"]}>
            <Flex alignItems="center" display={["inherit", "inherit", "none"]}>
              <Box position="relative">
                <Icon
                  as={BiCartAlt}
                  boxSize={6}
                  cursor={"pointer"}
                  onClick={() => {
                    isOpen ? onClose() : onOpen();
                    setDrawerProps({
                      type: "cart",
                      placement: "right",
                      size: "full",
                    });
                  }}
                />
                <Box
                  position="absolute"
                  top="-5px"
                  right="-5px"
                  w="16px"
                  h="16px"
                  bg="#a47e6c"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="10px"
                  fontWeight="bold"
                  color="white"
                >
                  {count}
                </Box>
              </Box>
            </Flex>
            {!isOpen && (
              <IconButton
                variant="ghost"
                size="md"
                icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                aria-label="Open Menu"
                display={["inherit", "inherit", "none"]}
                onClick={() => {
                  isOpen ? onClose() : onOpen();
                  setDrawerProps({
                    type: "nav",
                    placement: "left",
                    size: "lg",
                  });
                }}
              />
            )}
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Screen Links */}
      <Drawer
        placement={drawerProps.placement}
        onClose={onClose}
        isOpen={isOpen}
        size={drawerProps.size}
      >
        <DrawerOverlay />
        {drawerProps.type === "nav" ? (
          data && (
            <DrawerNav
              onClose={onClose}
              onOpen={onOpen}
              data={data}
              isOpen={isOpen}
            />
          )
        ) : (
          <DrawerCart onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
        )}
      </Drawer>
    </Box>
  );
}

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
