import { Box } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import SmallImage from "../SmallImage";

interface ContainerProps {
  data: any;
  handleImageClick: (item: number) => void;
}

const SmallImages = (props: ContainerProps) => {
  const { data, handleImageClick } = props;

  const renderImgs = useCallback(() => {
    const result = data.map(
      (
        item: { node: { originalSrc: string }; isSelected: boolean },
        index: number
      ) => {
        return (
          <SmallImage
            src={item.node.originalSrc}
            isSelected={item.isSelected}
            handleImageClick={handleImageClick}
            itemIndex={index}
            key={index}
          />
        );
      }
    );

    return result;
  }, [data, handleImageClick]);

  useEffect(() => {
    renderImgs();
  }, [renderImgs]);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      {renderImgs()}
    </Box>
  );
};

export default SmallImages;
