import { SanityBody } from "@/typesSanity/docs/default";

export interface IDataCategorias extends SanityBody {
  title: string;
  slug: {
    current: string;
    _type: string;
  };
  images: ICategoryImages[];
}

interface ICategoryImages {
  title: string;
  _key: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}
