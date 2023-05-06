import { SanityBody } from "@/typesSanity/default";

export interface IDataFooter extends SanityBody {
  logo: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  derechos: string;
  enlaces: {
    icono: string;
    nombre: string;
    url: string;
    _key: string;
  }[];
  sobre_nosotros_apartado_1: {
    _key: string,
    nombre: string,
    url?: string
  }[]
  sobre_nosotros_apartado_2: {
    _key: string,
    nombre: string,
    url?: string
  }[]
}