import { useQuery } from "react-query";
import { productsFetcher, QueryKeys } from "../../queryClient";
import ProductItem from "../../components/products/Item";
import { Stack } from "@mui/material";
import GET_PRODUCTS, { Products } from "../../graphql/products";

const ProductList = () => {
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    productsFetcher(GET_PRODUCTS)
  );

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
