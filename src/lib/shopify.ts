import { GraphQLClient } from "graphql-request";

const endpoint =
  "https://mariette-jewelry.myshopify.com/api/2021-07/graphql.json";
const token = "67b27dadd1f1adbf064073de0df2dbf3";

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": token,
  },
});
