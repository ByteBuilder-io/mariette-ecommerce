import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IDataProductos } from "@/typesSanity/docs/productos";
import { client } from "@/lib/sanity.client";
import ProductDetail from "@/components/productDetail";
import { graphQLClient } from "@/lib/shopify";
import Loading from "@/components/commons/Loading";
import Footer from "@/components/footer";

export interface IDataImage {
  product: {
    images: {
      edges: { node: { originalSrc: string } }[];
    };
    compareAtPriceRange: { maxVariantPrice: { amount: string } };
  };
}

export interface IDataVideo {
  product: {
    media: {
      nodes: [{ sources: { url: string }[] }];
    };
  };
}

const ProductoDetalle = () => {
  const [data, setData] = useState<IDataProductos[]>();
  const [dataImages, setDataImages] = useState<IDataImage>();
  const [video, setVideo] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    async function fetchData() {
      if (slug != undefined && slug != "") {
        setData(undefined);
        setDataImages(undefined);
        const query = `*[_type == 'product' && store.status == 'active' && store.isDeleted == false && store.id == ${slug}] {
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
        console.log(data);
        setData(data);
        if (data === undefined || data.length === 0) return;
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
              compareAtPriceRange {
                maxVariantPrice {
                  amount
                }
              }
            }
          }
        `;

        // Utilizando el cliente GraphQL
        const image: IDataImage = await graphQLClient.request(s);

        const videos = `
          query {            
              product(id: "${data[0].gid}") {
                media(first: 1, reverse: true) {
                  nodes {
                    ... on Video {
                      sources {
                        url
                      }
                    }
                  }
                }
              }
            }          
        `;

        // Utilizando el cliente GraphQL
        const video: IDataVideo = await graphQLClient.request(videos);
        if (
          video.product &&
          Object.keys(video.product.media.nodes[0]).length !== 0
        )
          setVideo(video.product.media.nodes[0].sources[0].url);
        setDataImages(image);
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      {data && dataImages && (
        <ProductDetail
          producto={data[0]}
          images={dataImages.product.images.edges}
          video={video ? video : ""}
          salesPrice={
            dataImages.product.compareAtPriceRange.maxVariantPrice.amount
          }
        />
      )}
      {data && <Footer />}
    </Box>
  );
};

export default ProductoDetalle;
