import { Flex, Text } from "@chakra-ui/react";
import { Fragment } from "react";

const Description = () => {
  return (
    <Fragment>
      <Flex mt="20px">
        <Text fontSize="14px">
          Un accesorio moderno que puede combinarse con todos tus conjuntos,
          este anillo grueso presenta cinco gemas para formar una constelación.
          Disponible en oro y plata, este anillo aportará estilo a todos tus
          conjuntos, tanto si te vistes de forma elegante como informal.
        </Text>
      </Flex>
      <Flex mt="10px" fontSize="14px">
        <Text>
          Un accesorio moderno que puede combinarse con todos tus conjuntos,
          este anillo grueso presenta cinco gemas para formar una constelación.
          Disponible en oro y plata, este anillo aportará estilo a todos tus
          conjuntos, tanto si te vistes de forma elegante como informal.
        </Text>
      </Flex>
    </Fragment>
  );
};

export default Description;
