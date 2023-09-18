import { SanityBody } from "@/typesSanity/docs/default";

export interface IDataNav extends SanityBody {
  logo: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  links: ILinks[];
}

interface ILinks {
  _key: string;
  title: string;
  link: {
    url?: string;
    isSubmenu: boolean;
    submenu?: ISubMenu[];
  };
  dataUrl: { url: string };
}

interface ISubMenu {
  _key: string;
  title: string;
  url: string;
}
