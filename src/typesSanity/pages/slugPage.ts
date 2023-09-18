import { IHero } from "@/typesSanity/docs/hero";

export interface ISlug {
  _id: string;
  title: string;
  slug: string;
  componentes: [IHero];
}
