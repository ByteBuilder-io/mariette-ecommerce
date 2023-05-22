import { SanityBody } from "@/typesSanity/docs/default";

export interface IBasicImage extends SanityBody {
  _type: string;
  url: {
    _type: string;
    _ref: string;
  };
  img: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
    _updatedAt: string;
  };
  side: {
    opcion: string;
  };
  text: string;
  urlData?: { url: number };
}
