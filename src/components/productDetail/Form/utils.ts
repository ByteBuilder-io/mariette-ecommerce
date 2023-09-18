export const dataGema: any = [
  { value: "diamante", label: "Diamante" },
  { value: "esmeralda", label: "Esmeralda" },
  { value: "rubí", label: "Rubí" },
  { value: "zafiro", label: "Zafiro" },
  { value: "topacio", label: "Topacio" },
];

export const d2 = [
  { text: "Oro" },
  { text: "Plata" },
  { text: "Metal" },
  { text: "Diamante" },
];

export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px", // cambiar tamaño de fuente aquí
    borderRadius: "none",
    width: "200px",
    borderColor: "#997d6c",
    borderTopColor: "#997d6c",
    borderBottomColor: "#997d6c",
    borderLeftColor: "#997d6c",
    borderRightColor: "#997d6c",
    boxShadow: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
    borderColor: "#997d6c",
    width: "200px",
    "&:hover": {
      backgroundColor: "rgba(195, 212, 224, 0.5)",
      color: "black"
    },
    backgroundColor: state.isSelected ? "#997d6c" : "transparent",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    borderColor: "#997d6c",
    width: "200px",
  }),
};
