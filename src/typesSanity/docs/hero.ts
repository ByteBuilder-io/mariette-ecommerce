import { SanityBody } from "@/typesSanity/docs/default";

export interface IHero extends SanityBody {
  _type: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  contenido: THero[];
}

export interface THero {
  imagen: TContenido;
  texto: string;
  texto_button: string;
  _key: string;
  url: {
    _type: string;
    _ref: string;
  };
  urlData?: { url: number };
}

export interface TContenido {
  _type: string;
  asset: {
    _type: string;
    _ref: string;
  };
}
