import { Box, Container, Text } from "@chakra-ui/react";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import SliderInstagram from "./SliderInstagram";
import GridInstagram from "./GridInstagram";

const NEXT_PUBLIC_TOKEN_INSTAGRAM =
  "EAADNYgu0C1QBALkhoZADA770tewIjh4cX4K5lZBaJntk0s8hudZC14gVelZBzQUhOR6QXkE5yKr7dlExK07cZCyv2lZBC8qyDVOXxVLpv7yOPRXPMzQvRSu4ohEq5kkXvdKgCa7C0BJfyW8O3zBFWN2nX5jgLL9ZBuaNOrjmqFOpEIMUYvqsCCI";
const NEXT_PUBLIC_ID_INSTAGRAM = "17841402588128602";
const NEXT_PUBLIC_ID_PROJECT = "225820986837844";
const URI_FACEBOOK = "https://graph.facebook.com/v16.0";
const APP_SECRET = "7c6329f285d30ffa27855abedcbd9969";
const QUERY_FACEBOOK =
  "media?fields=media_url,media_type,thumbnail_url,permalink&access_token=";

const Instagram = ({ data }: { data: any }) => {
  const { width, height } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [dataInstagram, setDataInstagram] = useState([]);

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  const loadInstagram = useCallback(async (token: string) => {
    const URI = `${URI_FACEBOOK}/${NEXT_PUBLIC_ID_INSTAGRAM}/${QUERY_FACEBOOK}${token}`;
    const result = await axios.get(URI);
    setDataInstagram(result.data.data);
  }, []);

  const extendToken = useCallback(async () => {
    const url = `${URI_FACEBOOK}/oauth/access_token?grant_type=fb_exchange_token&client_id=${NEXT_PUBLIC_ID_PROJECT}&client_secret=${APP_SECRET}&fb_exchange_token=${NEXT_PUBLIC_TOKEN_INSTAGRAM}`;
    try {
      const response = await axios.get(url);
      const extendedToken = response.data.access_token;

      await loadInstagram(extendedToken);
    } catch (error) {
      console.log("Error al extender el token:", error);
      return null;
    }
  }, [loadInstagram]);

  useEffect(() => {
    if (width < 750) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    extendToken();
  }, [extendToken]);

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
