import {
  Box,
  Button,
  Card,
  CardMedia,
  List,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemSelector } from "../../atoms/cart";
import { ADD_CART } from "../../graphql/cart";
import { Product } from "../../graphql/products";
import { cartAddFetcher } from "../../queryClient";

const ProductItem = ({ id, title, imageUrl, price, createdAt }: Product) => {
  const { mutate: addCart } = useMutation((id: string) =>
    cartAddFetcher(ADD_CART, { id })
  );

  return (
    <Card>
      <Link to={`/products/${id}`}>
        <Typography variant="h6">{title}</Typography>
        <ItemImage src={imageUrl} />
        <span>{price}</span>
        <span>{createdAt}</span>
      </Link>
      <Button onClick={() => addCart(id)}>담기</Button>
    </Card>
  );
};

export default ProductItem;

const ItemList = styled(List)(() => ({
  width: "300px",
}));

const ItemImage = styled("img")(() => ({
  width: "100%",
}));
