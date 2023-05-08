export interface TMain {
  contenido: THero[];
}

export interface THero {
  imagen: TContenido;
  texto: string;
  texto_button: string;
  _key: string;
}

export interface TContenido {
  _type: string;
  asset: {
    _type: string;
    _ref: string;
  };
}
