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
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<IHome>();

  useEffect(() => {
    async function fetchData() {
      if (slug != undefined && slug != "") {
        const query = `
            *[_type == "pages" && slug.current == "${slug}"] {
              _id,
              title,
              "slug": slug.current,
              componentes[]-> {
                ...
              }
            }[0]
          `;
        const dataHome = await client.fetch(query);
        setData(dataHome);
      }
    }

    fetchData();
  }, [slug]);
  return (
    <>
      {data &&
        data.componentes.map((componente) => (
          <ComponentRenderer
            key={componente._id}
            component={componente._type}
            data={componente}
          />
        ))}
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

export default Page;
