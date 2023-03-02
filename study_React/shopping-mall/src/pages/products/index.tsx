import { useQuery } from "react-query";
import { fetcher, QueryKeys } from "../../queryClient";

const ProductList = () => {
  const { data } = useQuery(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: "GET",
      path: "/products",
    })
  );
  console.log(data);

  return <div>상품페이지에요</div>;
};

export default ProductList;
