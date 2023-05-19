import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IDataProductos } from "@/typesSanity/docs/productos";
import { client } from "@/lib/sanity.client";
import ProductDetail from "@/components/productDetail";
import { graphQLClient } from "@/lib/shopify";
import Loading from "@/components/commons/Loading";

export interface IDataImage {
  product: {
    images: {
      edges: { node: { originalSrc: string } }[];
    };
  };
}

const ProductoDetalle = () => {
  const [data, setData] = useState<IDataProductos[]>();
  const [dataImages, setDataImages] = useState<IDataImage>();
  const [loading, setLoading] = useState<boolean>(true)
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
        const s = `
          query {
            product(id: "${data[0].gid}") {
              images(first: 10) {
                edges {
                  node {
                    originalSrc
                  }
                }
              }
            }
          }
        `;

        // Utilizando el cliente GraphQL
        const image: IDataImage = await graphQLClient.request(s);
        setDataImages(image);
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
    <Box>
      {data && dataImages && (
        <ProductDetail
          producto={data[0]}
          images={dataImages.product.images.edges}
        />
      )}
    </Box>
  );
};

export default ProductoDetalle;
