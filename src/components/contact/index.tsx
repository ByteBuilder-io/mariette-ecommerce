import {
  Container,
  Flex,
  Box,
  Wrap,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import Form from "./Form";
import Detail from "./Detail";
import { client } from "@/lib/sanity.client";

interface ContainerProps {
  noHeader?: boolean;
  dataContacto: any;
}

interface IDataContacto {
  _createdAt: string;
  correo: string;
  _rev: string;
  _type: string;
  _id: string;
  telefono: string;
  _updatedAt: string;
  ubicacion: string;
  notificacion: string[];
}

const Contact = (props: ContainerProps) => {
  const { noHeader } = props;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();
  const [data, setData] = useState<IDataContacto>(props.dataContacto);

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <>
      <Box
        bg="#846a5a"
        mt={noHeader ? "30px" : "80px"}
        mb={noHeader ? "30px" : "80px"}
      >
        <Flex
          flexWrap={{ base: "wrap", md: "nowrap" }}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box w={{ base: "100%", md: "37%" }}>
            {data && <Detail isMobile={isMobile} data={data} />}
          </Box>
          <Box w={{ base: "100%", md: "63%" }}>
            {data && (
              <Form isMobile={isMobile} notificacion={data.notificacion} />
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Contact;
