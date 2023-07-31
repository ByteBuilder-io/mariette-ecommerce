import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import ContainerSample from "@/components/commons/ContainerSample";
import CheckOutMaps from "@/components/checkOutMaps";
import Footer from "@/components/footer";

import useWindowDimensions from "@/hooks/useWindowDimensions";

interface IProducts {
  id: string;
  product: string;
  detail: {
    Metal: string;
    Talla: string;
    Gema: string;
  };
}

const htmlTemplate = (product: IProducts[], pId: string | string[]) => {
  const generateTable = (products: IProducts[]): string => {
    let tableHTML =
      '<table style="border-collapse: collapse; width: 100%;">\n<thead>\n<tr style="background-color: #f2f2f2;"><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Producto</th><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Metal</th><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Talla</th><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Gema</th></tr>\n</thead>\n<tbody>\n';

    products.forEach((product) => {
      tableHTML += `<tr style="border: 1px solid #dddddd;"><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
        product.product
      }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
        product.detail.Metal === undefined ? "N/A" : product.detail.Metal
      }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
        product.detail.Talla === undefined ? "N/A" : product.detail.Talla
      }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
        product.detail.Gema === undefined ? "N/A" : product.detail.Gema
      }</td></tr>\n`;
    });

    tableHTML += "</tbody>\n</table>";
    return tableHTML;
  };
  return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>Mariette</title>
        <style>
            /* Estilos para el encabezado */
            header {
                text-align: center;
                padding: 20px;
            }
    
            /* Estilos para el cuerpo */
            main {
                padding: 20px;
            }
    
            /* Estilos para el pie de página */
            footer {
                text-align: center;
                padding: 20px;
            }
    
            img {
                width: 250px;
                height: 100px;
            }
    
            .img-icon {
                width: 30px !important;
                height: 30px !important;
            }
    
            .fondo-gris {
                background-color: #f2f2f2;
                /* un tono de gris claro */
            }
        </style>
    </head>
    
    <body>
        <header>
            <img src="https://mariette.com.mx/wp-content/uploads/2022/10/cropped-LOGO-2-mariette.png"
                alt="Logo de la empresa">
        </header>
        <main>
            <p>Detalles de la compra ${pId}</p>
            <p>A continuacion encontraras los detalles de la compra.</p>
            <p>${generateTable(product)}</p>
        </main>
        <footer>
            <a href="https://www.facebook.com/tu_pagina" target="_blank"><i class="fab fa-facebook"
                    style="color: white; font-size: 30px; margin-right: 10px;"></i></a>
            <a href="https://www.instagram.com/tu_pagina" target="_blank"><i class="fab fa-instagram"
                    style="color: white; font-size: 30px;"></i></a>
            <p>
                <a href="https://www.ejemplo.com">Pagina Web</a>
                <a href="https://www.ejemplo.com">Terminos y condiciones</a>
                <a href="https://www.ejemplo.com">Aviso de privacidad</a>
            </p>
        </footer>
    </body>
    
    </html>
`;
};

const AfterCheckout = () => {
  const [dataProducts, setDataProducts] = useState<IProducts[]>();
  const router = useRouter();
  const { pId, adress } = router.query;
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (pId != undefined && pId != "") {
      const sendEmail = async () => {
        const products = await Cookies.get("products");
        console.log(products);
        if (products != undefined) {
          console.log(products);
          const finalData = JSON.parse(products);
          setDataProducts(finalData);
          console.log(dataProducts);
          const opts = {
            sender: { name: "Mariette", email: "osvaldo@bytebuilder.io" },
            to: [
              {
                email: "jcarlos.horus@gmail.com",
                name: "jcarlos@bytebuilder.io",
              },
            ],
            replyTo: { email: "hecntdev1@gmail.com" },
            subject: `Nuevo compra #${pId}- Mariette`,
            htmlContent: htmlTemplate(finalData!, pId),
          };
          const headers = {
            "api-key": process.env.NEXT_PUBLIC_BREVO,
            "Content-Type": "application/json",
          };

          await axios.post("https://api.brevo.com/v3/smtp/email", opts, {
            headers: headers,
          });
          await Cookies.remove("products");
          await Cookies.remove("checkoutUrl");
          await Cookies.remove("idCart");
        }
      };
      sendEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pId]);

  return (
    <>
      <ContainerSample>
        <VStack>
          <Box>
            <Heading
              textColor={"#836a59"}
              fontFamily={"heading"}
              textAlign={"center"}
            >
              Gracias por tu compra
            </Heading>
          </Box>
          <Box>
            <Text
              textColor={"#836a59"}
              fontSize="xl"
              textAlign={"center"}
              fontFamily={"heading"}
            >
              Nuestro equipo dara seguimiento a tu pedido
            </Text>
          </Box>
          <Box py={10} w={"100%"}>
            <Box
              borderWidth="1px"
              shadow={"lg"}
              rounded="md"
              overflow="hidden"
              bg={useColorModeValue("white", "gray.800")}
              w={{ base: "100%", lg: "1000px" }}
              maxW={width}
            >
              <Box p={10} maxW={width - 50}>
                <TableContainer>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Producto</Th>
                        <Th>Metal</Th>
                        <Th>Talla</Th>
                        <Th>Gema</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataProducts &&
                        dataProducts.map((e) => {
                          return (
                            <Tr key={e.id}>
                              <Td>{e.product}</Td>
                              <Td>
                                {e.detail.Metal === undefined
                                  ? "N/A"
                                  : e.detail.Metal}
                              </Td>
                              <Td>
                                {e.detail.Talla === undefined
                                  ? "N/A"
                                  : e.detail.Talla}
                              </Td>
                              <Td>
                                {e.detail.Gema === undefined
                                  ? "N/A"
                                  : e.detail.Gema}
                              </Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </VStack>
      </ContainerSample>
      <ContainerSample isBottom>
        {adress && <CheckOutMaps address={adress} />}
      </ContainerSample>
      <Box
        backgroundColor={"#faf5f1"}
        h={"100%"}
        position={"absolute"}
        top={0}
        left={0}
        w="100%"
        zIndex={-2}
      />
      <Footer />
    </>
  );
};

export default AfterCheckout;
