import { useQuery } from "react-query";
import { GET_CART } from "../../graphql/cart";
import { cartAddFetcher, QueryKeys } from "../../queryClient";

const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, () => cartAddFetcher(GET_CART));
  console.log(data);
  return <div>장바구니</div>;
};

export default Cart;
