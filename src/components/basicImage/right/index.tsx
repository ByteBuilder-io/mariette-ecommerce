import { sanityImage } from "@/lib/sanity.image";

import ImageText from "../Image";
import { Box, Center, Container } from "@chakra-ui/react";
import { IBasicImage } from "@/typesSanity/docs/basicImage";

interface ContainerProps {
  data: IBasicImage;
}

const BasicImageRight = (props: ContainerProps) => {
  const { data } = props;

  return (
    <Box w="full">
      <Center>
        {data && data.urlData && (
          <ImageText
            text={data.text}
            imageUrl={sanityImage(data.img.asset._ref).url()}
            position={1}
            data={data}
            idProduct={data.urlData.url}
          />
        )}
      </Center>
    </Box>
  );
};

export default BasicImageRight;
