import { SanityBody } from "@/typesSanity/docs/default";

export interface IDataProductos extends SanityBody {
  createdAt: string;
  descriptionHtml: string;
  gid: string;
  id: number;
  isDeleted: boolean;
  options: IProductOptions[];
  previewImageUrl: string;
  priceRange: { minVariantPrice: number; maxVariantPrice: number };
  productType: string;
  slug: { current: string; _type: string };
  status: string;
  tags: string;
  title: string;
  variants: IVariantProduct[];
  vendor: string;
}

interface IProductOptions {
  name: string;
  _key: string;
  _type: string;
  values: string[];
}

interface IVariantProduct {
  _ref: string;
  _type: string;
  _key: string;
  _weak: boolean;
}
