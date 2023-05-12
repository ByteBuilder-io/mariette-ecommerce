import { Fragment, useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";

import ImageText from "../Image";

const BasicImageRight = () => {
  const query = `*[_type == "img_text"]`;
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, [query]);

  return (
    <Fragment>
      {data && data.length > 1 && (
        <ImageText
          text={data[1].text}
          imageUrl={sanityImage(data[1].img.asset._ref).url()}
          position={1}
        />
      )}
    </Fragment>
  );
};

export default BasicImageRight;
