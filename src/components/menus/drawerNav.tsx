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

interface IDrawerNav {
  data: IDataNav;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const DrawerNav = ({ data, isOpen, onOpen, onClose }: IDrawerNav) => {
  return (
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">
        <HStack>
          <Box>
            {data && (
              <Image
                src={sanityImage(data.logo.asset._ref).url()}
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
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input type="search" placeholder="Buscar..." />
          </InputGroup>
          <Divider />
          {data &&
            data.links.map((e) => {
              if (!e.link.isSubmenu) {
                return (
                  <>
                    <NavLink
                      key={e._key}
                      name={e.title}
                      path={e.link.url!}
                      onClose={onClose}
                    />
                    {e.link.isSubmenu && <Divider />}
                  </>
                );
              }
              return (
                <>
                  <Accordion key={e._key} allowMultiple>
                    <AccordionItem borderColor={"white"}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            {e.title}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      {e.link.submenu!.map((link, index) => (
                        <>
                          <AccordionPanel key={link._key} pb={4}>
                            <Text>{link.title}</Text>
                          </AccordionPanel>
                          <Divider />
                        </>
                      ))}
                    </AccordionItem>
                  </Accordion>
                  <Divider />
                </>
              );
            })}
        </Stack>
      </DrawerBody>
    </DrawerContent>
  );
};

export default DrawerNav;
