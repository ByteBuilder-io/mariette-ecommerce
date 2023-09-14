import React from "react";
import { Box } from "@chakra-ui/react";

const VideoComponent = ({ url, ...props }: any) => {
  return (
    <Box overflow="hidden" maxW="100%" width="100%" height="100%" {...props}>
      <video controls width="100%" autoPlay>
        <source src={url} type="video/mp4" />
        Tu navegador no admite el elemento de vídeo.
      </video>
    </Box>
  );
};

export default VideoComponent;
