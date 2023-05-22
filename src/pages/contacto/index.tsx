import Contact from "@/components/contact";
import { Container } from "@chakra-ui/react";

const Contacto = () => {
  return (
		<Container w={"100%"} maxW={"1400px"}>
    	<Contact noHeader />
		</Container>
  );
};

export default Contacto;
