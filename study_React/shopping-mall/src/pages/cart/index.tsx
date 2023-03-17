import { useQuery } from "react-query";
import { GET_CART } from "../../graphql/cart";
import { cartAddFetcher, QueryKeys } from "../../queryClient";

amount: 3;
createdAt: "Tue Mar 07 2023 23:09:09 GMT+0900 (한국 표준시)";
description: "상세내용1";
id: "1";
imageUrl: "https://placeimg.com/640/480/1";
price: 50000;
title: "상품1";
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
