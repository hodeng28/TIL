import { useQuery } from "react-query";
import { productsFetcher, QueryKeys } from "../../queryClient";
import ProductItem from "../../components/products/Item";
import { Stack } from "@mui/material";
import GET_PRODUCTS, { Products } from "../../graphql/products";
import styled from "@emotion/styled";

const ProductList = () => {
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    productsFetcher(GET_PRODUCTS)
  );

  return (
    <>
      <Wrapper>
        {data?.products?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </Wrapper>
    </>
  );
};

export default ProductList;

const Wrapper = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap",
}));
