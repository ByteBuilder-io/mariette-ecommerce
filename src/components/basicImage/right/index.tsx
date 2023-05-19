import { Fragment, useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";

import ImageText from "../Image";
import { Box, Center, Container } from "@chakra-ui/react";

interface ContainerProps {
  data: any
}

const BasicImageRight = (props: ContainerProps) => {
  const { data } = props
  console.log(data, "data")
  return (
    <Box w="full">
      <Center>
        {data && (
          <ImageText
            text={data.text}
            imageUrl={sanityImage(data.img.asset._ref).url()}
            position={1}
          />
        )}
      </Center>
    </Box>
  );
};

export default BasicImageRight;
