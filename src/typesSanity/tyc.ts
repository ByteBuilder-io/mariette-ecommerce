import { SanityBody } from "@/typesSanity/default";

export interface IDataTyc extends SanityBody {
  title: string;
  subtitle: string;
  slug: {
    current: string;
    _type: string;
  };
  content: string;
}
