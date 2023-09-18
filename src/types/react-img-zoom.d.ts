declare module "react-img-zoom" {
  import { HTMLAttributes } from "react";

  interface ImgZoomProps extends HTMLAttributes<HTMLImageElement> {
    img: string;
    zoomScale: number;
    src?: string;
    alt?: string;
    zoomSrc?: string;
    zoomFactor?: number;
    width?: number;
    height?: number;
    offset?: { vertical?: number; horizontal?: number };
    zoomStyle?: { x?: number; y?: number; width?: number; height?: number };
    transitionTime?: number;
    onZoomChange?: (zoomed: boolean) => void;
  }

  export default function ImgZoom(props: ImgZoomProps): JSX.Element;
}
