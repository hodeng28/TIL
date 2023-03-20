import { Stack } from "@mui/material";
import { useQuery } from "react-query";
import CartList from "../../components/cart";
import { CartType, GET_CART } from "../../graphql/cart";
import { cartAddFetcher, QueryKeys } from "../../queryClient";

const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, () => cartAddFetcher(GET_CART));

  const cartItems = Object.values(data || {}) as CartType[];

  if (!cartItems.length) <Stack>장바구니가 비었습니다.</Stack>;

  return <CartList items={cartItems} />;
};

export default Cart;
