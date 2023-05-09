import { Box } from "@chakra-ui/react";

interface ContainerProps {
  src: string;
  isSelected: boolean;
}

const SmallImage = (props: ContainerProps) => {
  const { src, isSelected } = props;

  return (
    <Box
      as="img"
      src={src}
      width="calc((100% - 80px) / 3)" // establece el ancho de la imagen pequeña en función del ancho de la imagen principal
      height="auto"
      objectFit="cover"
      mb="2"
      mt="2"
      style={{ filter: !isSelected ? "blur(1px)" : "" }}
      cursor="pointer"
      ml="5px"
      mr="5px"
    />
  );
};

export default SmallImage;
