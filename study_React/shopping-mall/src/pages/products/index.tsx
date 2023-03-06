import { useQuery } from "react-query";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";
import ProductItem from "../../components/products/Item";
import { Stack, Typography } from "@mui/material";

const ProductList = () => {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: "GET",
      path: "/products",
    })
  );

  return (
    <>
      <Stack>
        {data?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </Stack>
    </>
  );
};

export default ProductList;
