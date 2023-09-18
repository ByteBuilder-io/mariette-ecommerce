import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import SmallImage from "../SmallImage";

interface ContainerProps {
  data: any;
  handleImageClick: (item: number, isVideo?: boolean) => void;
  video: string;
}

const SmallImages = (props: ContainerProps) => {
  const { data, handleImageClick, video } = props;

  const [dataImg, setDataImg] = useState<any>([]);

  const renderImgs = useCallback(() => {
    const uniqueData = dataImg.reduce(
      (accumulator: any, current: any) => {
        if (!accumulator.seen[current.node.originalSrc]) {
          accumulator.result.push(current);
          accumulator.seen[current.node.originalSrc] = true;
        }
        return accumulator;
      },
      { seen: {}, result: [] }
    ).result;

    const result = uniqueData.map(
      (
        item: {
          node: { originalSrc: string };
          isSelected: boolean;
          isVideo: boolean;
        },
        index: number
      ) => {
        return (
          <SmallImage
            src={
              item.isVideo
                ? uniqueData[0].node.originalSrc
                : item.node.originalSrc
            }
            isSelected={item.isSelected}
            isVideo={item.isVideo}
            handleImageClick={handleImageClick}
            itemIndex={index}
            key={index}
          />
        );
      }
    );

    return result;
  }, [dataImg, handleImageClick]);

  useEffect(() => {
    if (video !== "")
      data.push({ node: { originalSrc: video }, isVideo: true });
    setDataImg(data);
  }, [data]);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      {dataImg.length > 0 && renderImgs()}
    </Box>
  );
};

export default SmallImages;
