import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { FaInstagram, FaPlayCircle } from "react-icons/fa";

interface ContainerProps {
  src: string;
  isSelected: boolean;
  handleImageClick: (item: number, isVideo?: boolean) => void;
  itemIndex: number;
  isVideo: boolean;
}

const SmallImage = (props: ContainerProps) => {
  const { src, isSelected, handleImageClick, itemIndex, isVideo } = props;

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Box
      position="relative"
      width="calc((100% - 80px) / 3)"
      height="98px"
      mb="2"
      mt="2"
      cursor="pointer"
      ml="5px"
      mr="5px"
      border={isSelected || isHover ? "1px solid gray" : ""}
      padding={isSelected || isHover ? "3px" : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleImageClick(itemIndex, isVideo)}
    >
      <Box as="img" src={src} width="100%" height="100%" objectFit="cover" />
      {isVideo && (
        <Box
          as={FaPlayCircle}
          size="24px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
        />
      )}
    </Box>
  );
};

export default SmallImage;
