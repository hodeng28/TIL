import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProductDetail from "../../components/products/Details";
import { GET_PRODUCT, Product } from "../../graphql/products";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  );

  if (!data) return null;

  return (
    <>
      <ProductDetail item={data} />
    </>
  );
};

export default ProductDetailPage;
