import { useState } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { EditIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";

export function IconToInput() {
  const [isEditing, setIsEditing] = useState(false);

  const handleMouseEnter = () => {
    setIsEditing(true);
  };

  const handleMouseLeave = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Buscar..."
            onBlur={handleMouseLeave}
          />
        </InputGroup>
      ) : (
        <IconButton
          aria-label="Add item"
          icon={<SearchIcon />}
          variant="ghost"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
}
