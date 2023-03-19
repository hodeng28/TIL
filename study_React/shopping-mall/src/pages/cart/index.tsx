import { useQuery } from "react-query";
import { GET_CART } from "../../graphql/cart";
import { cartAddFetcher, QueryKeys } from "../../queryClient";

const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, () => cartAddFetcher(GET_CART));
  if (!data) {
    return;
  }
  return (
    <div>
      <div>{data?.amount}</div>
      <div>{data?.id}</div>
      <div>{data?.price}</div>
      <div>{data?.title}</div>
    </div>
  );
};

export default Cart;
