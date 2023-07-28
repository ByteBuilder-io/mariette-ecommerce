import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  isBottom?: boolean
}

const ContainerSample = (props: ContainerProps) => {
  const { children, isBottom } = props;

  return (
    <Container
      py={10}
      maxW="1200px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={isBottom ? "-70px" : "" }
    >
        {children}
    </Container>
  );
};

export default ContainerSample;
