import { Box, Container, Text } from "@chakra-ui/react";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import SliderInstagram from "./SliderInstagram";
import GridInstagram from "./GridInstagram";

const Instagram = ({ data }: { data: any }) => {
  const { width, height } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [dataInstagram, setDataInstagram] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_TOKEN_INSTAGRAM;
  const URI = `https://graph.facebook.com/v16.0/${process.env.NEXT_PUBLIC_ID_INSTAGRAM}/media?fields=media_url,media_type,thumbnail_url,permalink&access_token=${API_KEY}`;

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  const loadInstagram = useCallback(async () => {
    const result = await axios.get(URI);
    setDataInstagram(result.data.data);
  }, [URI]);

  useEffect(() => {
    if (width < 750) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    loadInstagram();
  }, [loadInstagram]);

  return (
    <Container w={"100%"} maxW={"1400px"}>
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
        {isMobile && (
          <SliderInstagram data={dataInstagram} openLink={openLink} />
        )}
        {!isMobile && dataInstagram.length > 0 && (
          <GridInstagram openLink={openLink} data={dataInstagram} />
        )}
      </Box>
    </Container>
  );
};

export default Instagram;
