import { Fragment, useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";

import ImageText from "../Image";
import { IBasicImage } from "@/typesSanity/docs/basicImage";

interface ContainerProps {
  data: IBasicImage;
}

const BasicImageLeft = (props: ContainerProps) => {
  const { data } = props;

  return (
    <Fragment>
      {data && data.urlData && (
        <ImageText
          text={data.text}
          imageUrl={sanityImage(data.img.asset._ref).url()}
          position={2}
          data={data}
          idProduct={data.urlData.url}
        />
      )}
    </Fragment>
  );
};

export default BasicImageLeft;
