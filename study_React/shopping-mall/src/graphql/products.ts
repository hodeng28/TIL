import { gql } from "graphql-request";

export type PRODUCT = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  createAt: string;
};

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    id
    title
    imageUrl
    price
    description
    createAt
  }
`;

export default GET_PRODUCTS;
