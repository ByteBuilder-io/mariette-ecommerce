import { Fragment, useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { sanityImage } from "@/lib/sanity.image";

import ImageText from "../Image";

const BasicImageLeft = () => {
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
      {data && data.length > 0 && (
        <ImageText
          text={data[0].text}
          imageUrl={sanityImage(data[0].img.asset._ref).url()}
          position={2}
        />
      )}
    </Fragment>
  );
};

export default BasicImageLeft;
