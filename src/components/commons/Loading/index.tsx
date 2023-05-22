import { Box, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Spinner size="xl" color="#846a5a" mb="200px" />
    </Box>
  );
};

export default Loading;
