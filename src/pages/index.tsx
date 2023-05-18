import { Box, Container } from "@chakra-ui/react";
import Hero from "@/components/hero";
import ProductDetail from "@/components/productDetail";
import ShoppingCart from "@/components/cart";
import Filter from "@/components/filter";
import BasicImageRight from "@/components/basicImage/right";
import BasicImageLeft from "@/components/basicImage/left";
import CardCategory from "@/components/cards/cardCategory";
import BasicImage from "@/components/basicImage";
import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";
import { IHome } from "@/typesSanity/pages/home";
import Contact from "@/components/contact";
import Instagram from "@/components/instragram";
import { RelatedProduct } from "@/components/relatedProduct";

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
          {/* <RelatedProduct /> */}
          <Instagram />
          <Contact />
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
