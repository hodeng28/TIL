import { CartType } from "../../graphql/cart";
import CartItem from "./item";

const CartList = ({ items }: { items: CartType[] }) => {
  return (
    <>
      {items.map((item) => (
        <CartItem {...item} key={item.id} />
      ))}
    </>
  );
};

export default CartList;
