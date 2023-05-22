import { Container } from "@chakra-ui/react";
import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";

import { IHome } from "@/typesSanity/pages/home";

import Contact from "@/components/contact";
import Instagram from "@/components/instragram";
import Footer from "@/components/footer";

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
      {/*<Hero />*/}
      {/*<Container w={"100%"} maxW={"1400px"}>*/}
      {/*  <BasicImage positionImg={"left"} data={""} />*/}
      {/*  <CardCategory />*/}
      {/*  <Box*/}
      {/*    backgroundColor={"#faf5f1"}*/}
      {/*    h="100%"*/}
      {/*    position={"absolute"}*/}
      {/*    top={0}*/}
      {/*    left={0}*/}
      {/*    w="100%"*/}
      {/*    zIndex={-2}*/}
      {/*  />*/}
      {/*</Container>*/}
      {data &&
        data.componentes.map((componente) => (
          <ComponentRenderer
            key={componente._id}
            component={componente._type}
            data={componente}
          />
        ))}
      {data && (
        <Container w={"100%"} maxW={"1400px"}>
          <Footer />
        </Container>
      )}
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
