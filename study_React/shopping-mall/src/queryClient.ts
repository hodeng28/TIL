import { request, RequestDocument } from "graphql-request";
import { QueryClient } from "react-query";
import { Cart } from "./graphql/cart";
import { Product, Products } from "./graphql/products";

type BodyType = { [key: string]: any };

export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 1000,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

const BASE_URL = "/";

export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: BodyType;
  params?: BodyType;
}) => {
  try {
    let url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    };

    if (params) {
      const searchParams = new URLSearchParams(params);
      url += "?" + searchParams.toString();
    }

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const productsFetcher = (query: RequestDocument, varialbles = {}) =>
  request<Products>(BASE_URL, query, varialbles);

export const productFetcher = (query: RequestDocument, varialbles = {}) =>
  request<Product>(BASE_URL, query, varialbles);

export const cartAddFetcher = (query: RequestDocument, varialbles = {}) =>
  request<Cart>(BASE_URL, query, varialbles);

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
};
