import { IHero } from "@/typesSanity/docs/hero";

export interface IHome {
  _id: string;
  title: string;
  slug: string;
  componentes: [IHero];
}
