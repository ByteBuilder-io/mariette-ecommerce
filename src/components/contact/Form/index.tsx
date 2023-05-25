import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

import { htmlClient, htmlUser } from "./utils";
import { useCallback, useEffect, useState } from "react";

interface ContainerProps {
  isMobile: boolean;
  notificacion: string[];
}

const Form = (props: ContainerProps) => {
  const { isMobile, notificacion } = props;
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [usersMariette, setUsersMariette] = useState<
    { name: string; email: string }[]
  >([]);

  const handleText = (e: any, type: "name" | "email" | "message") => {
    setData({
      ...data,
      [type]: e.target.value,
    });
  };

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const resetFormData = () => {
    setData({
      name: "",
      email: "",
      message: "",
    });
  };

  const sendClient = async () => {
    const text = data.message;
    let html = htmlClient.replace("{{cuerpo_msg}}", text);
    html = html.replace("{{name}}", data.name);

    const opts = {
      sender: { name: "Mariette", email: "osvaldo@bytebuilder.io" },
      to: [{ email: data.email, name: data.name }],
      replyTo: { email: "hecntdev1@gmail.com" },
      subject: "Gracias por contactarnos - Mariette",
      htmlContent: html,
    };
    const headers = {
      "api-key": process.env.NEXT_PUBLIC_BREVO,
      "Content-Type": "application/json",
    };

    await axios.post("https://api.brevo.com/v3/smtp/email", opts, {
      headers: headers,
    });
  };

  const sendClientUser = async () => {
    const text = data.message;
    let html = htmlUser.replace("{{msg}}", text);
    html = html.replace("{{name}}", data.name);
    html = html.replace("{{email}}", data.email);

    const opts = {
      sender: { name: "Mariette", email: "osvaldo@bytebuilder.io" },
      to: usersMariette,
      replyTo: { email: "hecntdev1@gmail.com" },
      subject: "Nuevo mensaje - Mariette",
      htmlContent: html,
    };
    const headers = {
      "api-key": process.env.NEXT_PUBLIC_BREVO,
      "Content-Type": "application/json",
    };

    await axios.post("https://api.brevo.com/v3/smtp/email", opts, {
      headers: headers,
    });
  };

  const sendMail = async () => {
    if (
      data.email.length === 0 ||
      data.message.length === 0 ||
      data.name.length === 0
    ) {
      toast({
        title: "Alerta",
        description: "Debes completar los campos nombre, correo y mensaje.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setIsEmail(validateEmail(data.email));
      if (validateEmail(data.email)) {
        setIsLoading(true);
        await sendClient();
        await sendClientUser();
        setIsLoading(false);
        toast({
          title: "Gracias.",
          description: "En un momento se pondran en contacto contigo.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        resetFormData();
      } else {
        toast({
          title: "Error",
          description: "Debes de ingresar un correo valido.",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const formatNotifications = useCallback(() => {
    if (notificacion.length > 0) {
      const result = notificacion.map((item: string) => {
        const name = item.split("@");
        return { name: name[0], email: item };
      });

      setUsersMariette(result);
    }
  }, [notificacion]);

  useEffect(() => {
    formatNotifications();
  }, [formatNotifications]);

  return (
    <WrapItem justifyContent="center !important">
      <Box
        bg="white"
        borderRadius="none"
        ml={isMobile ? "" : "25px"}
        mb="40px"
        mt="40px"
        w={!isMobile ? "700px" : ""}
        justifyContent="center !important"
      >
        <Box m={8} color="#0B0E3F">
          <VStack spacing={5}>
            <FormControl id="name">
              <FormLabel>Tu nombre</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <BsPerson color="gray.800" />
                </InputLeftElement>
                <Input
                  type="text"
                  size="md"
                  borderRadius="none"
                  value={data.name}
                  onChange={(e: any) => handleText(e, "name")}
                  id={"name"}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Correo</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail color="gray.800" />
                </InputLeftElement>
                <Input
                  type="text"
                  size="md"
                  borderRadius="none"
                  onChange={(e: any) => handleText(e, "email")}
                  value={data.email}
                  borderColor={isEmail ? "gray.300" : "red.400"}
                  id={"email"}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="message">
              <FormLabel>Mensaje</FormLabel>
              <Textarea
                borderColor="gray.300"
                rows={6}
                borderRadius="none"
                _hover={{
                  borderRadius: "gray.300",
                }}
                placeholder="Escribir un mensaje..."
                value={data.message}
                onChange={(e: any) => handleText(e, "message")}
                id={"message"}
              />
            </FormControl>
            <FormControl id="submit" float="right">
              <Button
                isLoading={isLoading}
                variant="solid"
                bg="#846a5a"
                color="white"
                borderRadius="5px"
                _hover={{}}
                onClick={sendMail}
              >
                <Text fontSize="14px" fontWeight="normal">
                  Enviar mensaje
                </Text>
              </Button>
            </FormControl>
          </VStack>
        </Box>
      </Box>
    </WrapItem>
  );
};

export default Form;
