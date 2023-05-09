import { Box } from "@chakra-ui/react";
import { useState } from "react";

interface ContainerProps {
  src: string;
  isSelected: boolean;
  handleImageClick: (item: number) => void;
  itemIndex: number;
}

const SmallImage = (props: ContainerProps) => {
  const { src, isSelected, handleImageClick, itemIndex } = props;

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Box
      as="img"
      src={src}
      width="calc((100% - 80px) / 3)" // establece el ancho de la imagen pequeña en función del ancho de la imagen principal
      height="98px"
      objectFit="cover"
      mb="2"
      mt="2"
      cursor="pointer"
      ml="5px"
      mr="5px"
      border={isSelected || isHover ? "1px solid gray" : ""}
      padding={isSelected || isHover ? "3px" : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        handleImageClick(itemIndex);
      }}
    />
  );
};

export default SmallImage;
