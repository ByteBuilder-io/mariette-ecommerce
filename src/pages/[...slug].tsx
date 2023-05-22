import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";
import { IHome } from "@/typesSanity/pages/home";
import { useRouter } from "next/router";
import Loading from "@/components/commons/Loading";
import Footer from "@/components/footer";

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<IHome>();
  const [loading, setLoading] = useState<boolean>(true)

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
        setLoading(false)
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <Loading />
    )
  }

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
        <Footer />
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
