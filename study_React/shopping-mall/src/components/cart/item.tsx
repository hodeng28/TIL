import { Stack } from "@mui/material";
import { CartType } from "../../graphql/cart";

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => (
  <>
    <Stack>{id}</Stack>
    <Stack>{imageUrl}</Stack>
    <Stack>{price}</Stack>
    <Stack>{title}</Stack>
    <Stack>{amount}</Stack>
  </>
);

export default CartItem;
