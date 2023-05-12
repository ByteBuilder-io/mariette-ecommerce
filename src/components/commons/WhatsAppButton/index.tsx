import { Box, IconButton } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="10">
      <IconButton
        aria-label="WhatsApp"
        icon={<FaWhatsapp />}
        size="lg"
				zIndex=""
        colorScheme="green"
        onClick={() =>
          window.open("https://api.whatsapp.com/send?phone=123456789")
        }
      />
    </Box>
  );
};

export default WhatsAppButton;
