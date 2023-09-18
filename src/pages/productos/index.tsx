import { Container, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { useRouter } from "next/router";
import { IDataProductos } from "@/typesSanity/docs/productos";
import Filter from "@/components/filter";
import Loading from "@/components/commons/Loading";
import Footer from "@/components/footer";
import NotFound from "@/components/cards/notFound";
import CardsNoFilter from "@/components/cardsNoFilter";

const Productos = () => {
  const [data, setData] = useState<IDataProductos[]>();
  const [dataAll, setDataAll] = useState<IDataProductos[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { filter } = router.query;
  const query = `*[_type == 'product' && store.status != 'draft' && store.isDeleted == false] {
    "createdAt": store.createdAt,
    "descriptionHtml": store.descriptionHtml,
    "gid": store.gid,
    "id": store.id,
    "isDeleted": store.isDeleted,
    "options": store.options,
    "previewImageUrl": store.previewImageUrl,
    "priceRange": store.priceRange,
    "productType": store.productType,
    "slug": store.slug,
    "status": store.status,
    "tags": store.tags,
    "title": store.title,
    "variants": store.variants[] {
      'data': *[_id == ^._ref]{
        'option1': store.option1,
        'option2': store.option2
      }[0]
    },
    "vendor": store.vendor
  }`;

  useEffect(() => {
    async function fetchData() {
      const data: IDataProductos[] = await client.fetch(query);
      setDataAll(data);
      if (filter != undefined && filter != "" && data) {
        const filteredData = data.filter((item) => {
          if (item.tags && typeof item.tags === "string") {
            // @ts-ignore
            return item.tags.toLowerCase().includes(filter.toLowerCase());
          }
          return false;
        });
        setData(filteredData);
        setLoading(false);
      } else {
        setData(data);
        setLoading(false);
      }
    }

    fetchData();
  }, [filter, query]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Container py={10} maxW="1400px">
        {/*<CardsNoFilter />*/}
        {data && data.length > 0 && dataAll && dataAll.length > 0 && (
          <Filter dataProduct={data} dataAll={dataAll} />
        )}
        {data && data.length == 0 && <NotFound />}
      </Container>
      {data && data.length > 0 && dataAll && dataAll.length > 0 && <Footer />}
      {data && data.length == 0 && <Footer />}
    </>
  );
};

export default Productos;
