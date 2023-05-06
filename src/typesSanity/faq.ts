import { SanityBody } from "@/typesSanity/default";

export interface IDataFaq extends SanityBody {
  title: string;
  subtitle: string;
  slug: {
    current: string;
    _type: string;
  };
  faqs: IFaqs[];
}

export interface IFaqs {
  title: string;
  content: string;
  _type: string;
  _key: string;
}
