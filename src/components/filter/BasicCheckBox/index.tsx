import {
  ChakraProvider,
  Checkbox,
  CheckboxGroup,
  extendTheme,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Fragment } from "react";

import { checkboxTheme } from "../Checkbox";

const customTheme = extendTheme({
  components: {
    Checkbox: checkboxTheme,
  },
});

interface ContainerProps {
  title: string;
  options: { text: string; subText?: string }[];
}

const BasicCheckBox = (props: ContainerProps) => {
  const { title, options } = props;

  const renderOptions = () => {
    const result = options.map(
      (item: { text: string; subText?: string }, index: number) => {
        return (
          <Checkbox variant="circular" size="md" key={index}>
            <HStack>
              <Text fontSize="14px">{item.text}</Text>
              {item.subText && (
                <Text fontSize="12px" color="gray.400">
                  {item.subText}
                </Text>
              )}
            </HStack>
          </Checkbox>
        );
      }
    );

		return result
  };

  return (
    <Fragment>
      <Text fontWeight="bold" fontSize="14px">
        {title}
      </Text>
      <CheckboxGroup>
        <Stack spacing="1">
          <ChakraProvider theme={customTheme}>
            {renderOptions()}
          </ChakraProvider>
        </Stack>
      </CheckboxGroup>
    </Fragment>
  );
};

export default BasicCheckBox;