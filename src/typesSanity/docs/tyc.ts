import { SanityBody } from "@/typesSanity/docs/default";

export interface IDataTyc extends SanityBody {
  title: string;
  subtitle: string;
  slug: {
    current: string;
    _type: string;
  };
  content: string;
}
