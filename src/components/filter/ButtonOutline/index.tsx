import { Button, background } from "@chakra-ui/react";

interface IData {
  producto: string[];
  material: string[];
  talla: string[];
  rango_precio: string[];
  color: string[];
  categoria: string[];
}

interface ContainerProps {
  text: string;
  onClick?: any;
  data: any;
  isFilter?: boolean;
}

const ButtonActive = (props: ContainerProps) => {
  const { text, onClick, isFilter } = props;

  return (
    <Button
      borderColor="#997d6c"
      variant="outline"
      onClick={() => {
        onClick(text, isFilter ? "talla" : "Talla");
      }}
      bg="#997d6c"
      color="white"
      h="40px"
      w="40px"
      _hover={{ backgroundColor: "#997d6c" }}
    >
      {text}
    </Button>
  );
};

const ButtonNoActive = (props: ContainerProps) => {
  const { text, onClick, isFilter } = props;
  let type = isFilter ? "talla" : "Talla"

  return (
    <Button
      borderColor="#997d6c"
      variant="outline"
      color="#997d6c"
      h="40px"
      w="40px"
      onClick={() => {
        onClick(text, type);
      }}
    >
      {text}
    </Button>
  );
};

const ButtonOutline = (props: ContainerProps) => {
  const { text, onClick, data, isFilter } = props;

  const getValidation = () => {
    const filter = isFilter ? data.talla.includes(text) : data.Talla === text;
    return filter;
  };

  return (
    <>
      {getValidation() ? (
        <ButtonActive text={text} onClick={onClick} data={data} isFilter={isFilter}/>
      ) : (
        <ButtonNoActive text={text} onClick={onClick} data={data} isFilter={isFilter}/>
      )}
    </>
  );
};

export default ButtonOutline;
