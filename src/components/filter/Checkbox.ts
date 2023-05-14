import { checkboxAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

// default base style from the Checkbox theme
const baseStyle = definePartsStyle({
  control: {
    padding: 3,
    borderRadius: 0,
  },
});

// Defining a custom variant
const variantCircular = definePartsStyle({
  control: defineStyle({
    width: "8px",
    height: "8px",
    fontSize: "10px",
    rounded: "full",
    _checked: {
      bg: "#997d6c",
      borderColor: "#997d6c",
      _hover: {
        borderColor: "#997d6c",
        bg: "#997d6c",
      },
    },
  }),
});

// Defining a custom variant
const variantCircularCustomBlack = definePartsStyle({
  control: defineStyle({
    boxSize: 10,
    fontSize: "10px",
    rounded: "full",
    bg: "black",
    _checked: {
      bg: "black",
      borderColor: "black",
      _hover: {
        borderColor: "black",
        bg: "black",
      },
    },
  }),
});

const variantSquare = definePartsStyle({
  control: defineStyle({
    boxSize: 10,
    fontSize: "10px",
    rounded: "full",
    bg: "#272458",
    _checked: {
      bg: "#272458",
      borderColor: "#272458",
      _hover: {
        borderColor: "#272458",
        bg: "#272458",
      },
    },
  }),
});

const variantCircularCustomOrange = definePartsStyle({
  control: defineStyle({
    boxSize: 10,
    fontSize: "10px",
    rounded: "full",
    bg: "#ff6347",
    _checked: {
      bg: "#ff6347",
      borderColor: "#ff6347",
      _hover: {
        borderColor: "#ff6347",
        bg: "#ff6347",
      },
    },
  }),
});

const variantCircularCustomPurple = definePartsStyle({
  control: defineStyle({
    boxSize: 10,
    fontSize: "10px",
    rounded: "full",
    bg: "#272458",
    _checked: {
      bg: "#272458",
      borderColor: "#272458",
      _hover: {
        borderColor: "#272458",
        bg: "#272458",
      },
    },
  }),
});

const variantCircularCustomGrow = definePartsStyle({
  control: defineStyle({
    boxSize: 10,
    fontSize: "10px",
    rounded: "full",
    bg: "#bfb8a5",
    _checked: {
      bg: "#bfb8a5",
      borderColor: "#bfb8a5",
      _hover: {
        borderColor: "#bfb8a5",
        bg: "#bfb8a5",
      },
    },
  }),
});

const variants = {
  square: variantSquare,
  circular: variantCircular,
  circulasCustomBlack: variantCircularCustomBlack,
  circulasCustomOrange: variantCircularCustomOrange,
  circulasCustomPurple: variantCircularCustomPurple,
  circulasCustomGrow: variantCircularCustomGrow,
};

const sizes = {
  xl: definePartsStyle({
    control: defineStyle({
      boxSize: 14,
    }),
    label: defineStyle({
      fontSize: "2xl",
      marginLeft: 6,
    }),
  }),
  md: definePartsStyle({
    control: defineStyle({
      boxSize: 0.5,
    }),
    label: defineStyle({
      fontSize: "1xl",
      marginLeft: 2,
    }),
  }),
};

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});
