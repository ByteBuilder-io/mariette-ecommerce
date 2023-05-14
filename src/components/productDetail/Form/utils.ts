export const dataGema: any = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
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
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    borderColor: "#997d6c",
    width: "200px",
  }),
};
