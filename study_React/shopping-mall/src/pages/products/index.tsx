import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import ProductItem from "../../components/products/Item";
import { Stack, Typography } from "@mui/material";
import { GET_PRODUCTS, Products } from "../../graphql/products";

const ProductList = () => {
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher(GET_PRODUCTS)
  );

  console.log(data);

  return (
    <>
      <Stack>
        {data?.products?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </Stack>
    </>
  );
};

export default ProductList;
