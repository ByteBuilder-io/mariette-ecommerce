import { Button } from "@chakra-ui/react";

interface ContainerProps {
  text: string;
  onClick?: (item: any) => void;
}

const ButtonOutline = (props: ContainerProps) => {
  const { text, onClick } = props;

  return (
    <Button
      borderColor="#997d6c"
      variant="outline"
      color="#997d6c"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ButtonOutline;
