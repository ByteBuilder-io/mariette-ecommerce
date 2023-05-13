import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IDataProductos } from "@/typesSanity/productos";
import { client } from "@/lib/sanity.client";
import ProductDetail from "@/components/productDetail";

const ProductoDetalle = () => {
  const [data, setData] = useState<IDataProductos[]>();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    async function fetchData() {
      if (slug != undefined && slug != "") {
        const query = `*[_type == 'product' && store.status != 'draft' && store.id == ${slug}] {
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
          "variants": store.variants,
          "vendor": store.vendor,
        }`;
        const data: IDataProductos[] = await client.fetch(query);
        setData(data);
      }
    }
    fetchData();
  }, [slug]);
  console.log(data);
  return <Box>{data && <ProductDetail producto={data[0]} />}</Box>;
};

export default ProductoDetalle;
