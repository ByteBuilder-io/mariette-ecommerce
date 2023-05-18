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
}

const ButtonActive = (props: ContainerProps) => {
  const { text, onClick } = props;

  return (
    <Button
      borderColor="#997d6c"
      variant="outline"
      onClick={() => {
        onClick(text, "Talla");
      }}
      bg="#997d6c"
      color="white"
      h="50px"
      w="50px"
      _hover={{ backgroundColor: "#997d6c" }}
    >
      {text}
    </Button>
  );
};

const ButtonNoActive = (props: ContainerProps) => {
  const { text, onClick } = props;

  return (
    <Button
      borderColor="#997d6c"
      variant="outline"
      color="#997d6c"
      h="50px"
      w="50px"
      onClick={() => {
        onClick(text, "Talla");
      }}
    >
      {text}
    </Button>
  );
};

const ButtonOutline = (props: ContainerProps) => {
  const { text, onClick, data } = props;

  const getValidation = () => {
    const filter = data.Talla === text;
    return filter;
  };

  return (
    <>
      {getValidation() ? (
        <ButtonActive text={text} onClick={onClick} data={data} />
      ) : (
        <ButtonNoActive text={text} onClick={onClick} data={data} />
      )}
    </>
  );
};

export default ButtonOutline;
