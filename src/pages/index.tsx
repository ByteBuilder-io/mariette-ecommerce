import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";

import { IHome } from "@/typesSanity/pages/home";
import Footer from "@/components/footer";
import ComingSoon from "@/components/coming";

const Home = () => {
  const [data, setData] = useState<IHome>();
  const query = `
    *[_type == "homeDoc"] {
      _id,
      title,
      "slug": slug.current,
      componentes[]-> {
        ...
      }
    }[0]
  `;

  useEffect(() => {
    async function fetchData() {
      const dataHome = await client.fetch(query);
      setData(dataHome);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ComingSoon />
      {/*{data &&*/}
      {/*  data.componentes.map((componente) => (*/}
      {/*    <ComponentRenderer*/}
      {/*      key={componente._id}*/}
      {/*      component={componente._type}*/}
      {/*      data={componente}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*{data && <Footer />}*/}
    </>
  );
};

const ComponentRenderer = ({
  component,
  data,
}: {
  component: string;
  data: any;
}) => {
  const Component =
    require(`../components/componentsSanity/${component}`).default;
  return <Component data={data} />;
};

export default Home;
