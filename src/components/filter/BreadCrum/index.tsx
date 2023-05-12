import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";

const BreadCrumb = () => {
  return (
    <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink
          href="#"
          fontSize="13px"
          fontWeight="semibold"
          color="gray.500"
        >
          Inicio
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink
          href="#"
          fontSize="13px"
          fontWeight="semibold"
          color="gray.500"
        >
          Busqueda
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadCrumb;
