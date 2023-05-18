import { Box, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import SliderInstagram from "./SliderInstagram";
import GridInstagram from "./GridInstagram";

const Instagram = () => {
  const { width, height } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (width < 750) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <Box>
      <Text
        textAlign="center"
        fontSize="30px"
        fontFamily="Castoro Titling"
        color="#836a59"
        fontWeight="semibold"
        mb="40px"
      >
        FORMA PARTE DE NUESTRA COMUNIDAD EN INSTAGRAM
      </Text>
      {isMobile && <SliderInstagram />}
      {!isMobile && <GridInstagram openLink={openLink} />}
    </Box>
  );
};

export default Instagram;
