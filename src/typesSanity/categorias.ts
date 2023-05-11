import { SanityBody } from "@/typesSanity/default";

export interface IDataCategirias extends SanityBody {
  title: string;
  slug: {
    current: string;
    _type: string;
  };
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}
