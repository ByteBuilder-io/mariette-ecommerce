import React, { useRef, useState } from "react";
import {
  InstantSearch,
  connectAutoComplete,
  Configure,
} from "react-instantsearch-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Input,
  Stack,
  Text,
  Image,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import { Hit } from "react-instantsearch-core";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

interface AutoCompleteProps {
  hits: Hit[];
  currentRefinement: string;
  refine: (searchTerm: string) => void;
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!
);

const AutoComplete: React.FC<AutoCompleteProps> = ({
  hits,
  currentRefinement,
  refine,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleBlur = (e: React.FocusEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsHovered(false);
    }
  };

  const handleLinkClick = () => {
    setIsHovered(false);
  };

  return (
    <Box position="relative">
      <Box
        ref={containerRef}
        onClick={() => setIsHovered(true)}
        onBlur={handleBlur}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            value={currentRefinement}
            onChange={(event) => {
              refine(event.currentTarget.value);
            }}
            placeholder="Search..."
          />
        </InputGroup>

        {hits.length > 0 && isHovered && (
          <Box
            position="absolute"
            top="100%"
            width={{ base: "100%", lg: "500px" }} // <-- Ajusta el ancho según lo desees, por ejemplo 80%
            maxHeight="600px" // <-- Establece la altura máxima para el contenedor de hits
            overflowY="auto" // <-- Habilita el desplazamiento vertical
            bg="white"
            boxShadow="md"
            borderRadius="md"
            mt={2}
            zIndex={10}
          >
            {hits.map((hit) => (
              <Box p={3} key={hit.objectID} borderBottom="1px solid #ddd">
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Link href={"/productos/detalle/" + hit.id}>
                    <Stack direction="row" alignItems="center">
                      <Image w="30%" src={hit.image} alt="Caffe Latte" />

                      <CardBody>
                        <Heading size="sm">{hit.title}</Heading>
                      </CardBody>
                    </Stack>
                  </Link>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const CustomAutoComplete = connectAutoComplete(AutoComplete);

const SearchSelect = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="shopify_products">
      <Configure distinct={true} />
      <CustomAutoComplete />
    </InstantSearch>
  );
};

export default SearchSelect;
