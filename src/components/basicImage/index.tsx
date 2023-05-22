import BasicImageLeft from "@/components/basicImage/left";
import BasicImageRight from "@/components/basicImage/right";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { IDataNav } from "@/typesSanity/docs/nav";
import { IBasicImage } from "@/typesSanity/docs/basicImage";

interface IProps {
  data: IBasicImage;
}
const BasicImage = ({ data }: IProps) => {
  const [dataBasic, setDataBasic] = useState<IBasicImage>(data);
  const query = `
    *[_id == '${data._id}']{
        ...,
  'urlData': *[_id == ^.url._ref]{
                  'url':store.id
                }[0]
      }[0]
  `;
  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setDataBasic(data);
    }

    fetchData();
  }, []);
  if (data.side.opcion === "left") {
    return <BasicImageLeft data={dataBasic} />;
  } else {
    return <BasicImageRight data={dataBasic} />;
  }
};

export default BasicImage;
