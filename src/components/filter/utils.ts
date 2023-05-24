export const d1 = [
  { text: "Anillos", subText: "(18)" },
  { text: "Aretes", subText: "(8)" },
  { text: "Dijes", subText: "(8)" },
  { text: "Pulseras", subText: "(8)" },
];

export const d2 = [
  { text: "Oro Blanco 14K" },
  { text: "Oro Amarillo 14K" },
  { text: "Oro Rosado 14K" },
  { text: "Plata" },
];

export const d3 = [
  { text: "Menos de $20" },
  { text: "$20 a $50" },
  { text: "$50 a $100" },
  { text: "Mas de $100" },
];

export const d4 = [
  { value: "Aguamarina", label: "Aguamarina" },
  { value: "Amatista", label: "Amatista" },
  { value: "Apatita", label: "Apatita" },
  { value: "Citrino", label: "Citrino" },
  { value: "Diamante", label: "Diamante" },
  { value: "Diamante Negro", label: "Diamante Negro" },
  { value: "Esmeralda", label: "Esmeralda" },
  { value: "Granate", label: "Granate" },
  { value: "Lolita", label: "Lolita" },
  { value: "Moissanita", label: "Moissanita" },
  { value: "Moonstone", label: "Moonstone" },
  { value: "Ópalo Australiano", label: "Ópalo Australiano" },
  { value: "Ópalo Etíope", label: "Ópalo Etíope" },
  { value: "Peridoto", label: "Peridoto" },
  { value: "Rhodolita", label: "Rhodolita" },
  { value: "Rubí", label: "Rubí" },
  { value: "Tanzanita", label: "Tanzanita" },
  { value: "Topacio Blanco", label: "Topacio Blanco" },
  { value: "Topacio LondonBlue", label: "Topacio London Blue" },
  { value: "Topacio Místico", label: "Topacio Místico" },
  { value: "Topacio Sky Blue", label: "Topacio Sky Blue" },
  { value: "Topacio Swiss Blue", label: "Topacio Swiss Blue" },
  { value: "Turmalina", label: "Turmalina" },
  { value: "Turquesa", label: "Turquesa" },
  { value: "Zafiro Azul", label: "Zafiro Azul" },
  { value: "Zafiro Rosa", label: "Zafiro Rosa" },
  { value: "Zafiro Tea", label: "Zafiro Tea" },
];

export const colors = [
  { name: "Black", value: "black", label: "Negro" },
  { name: "Orange", value: "#ff6347", label: "Naranja" },
  { name: "Purple", value: "#272458", label: "Morado" },
  { name: "Grow", value: "#bfb8a5", label: "Cafe" },
];

export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px", // cambiar tamaño de fuente aquí
    borderRadius: "none",
    width: "250px",
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
    width: "250px",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    borderColor: "#997d6c",
    width: "250px",
  }),
};

