import { Fragment, useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";

import ImageText from "../Image";

interface ContainerProps {
  data: any
}

const BasicImageLeft = (props: ContainerProps) => {
  const { data } = props

  return (
    <Fragment>
      {data && (
        <ImageText
          text={data.text}
          imageUrl={sanityImage(data.img.asset._ref).url()}
          position={2}
          data={data}
        />
      )}
    </Fragment>
  );
};

export default BasicImageLeft;
