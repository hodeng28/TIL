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
import { ADD_CART } from "../../graphql/cart";
import { Product } from "../../graphql/products";
import { cartAddFetcher } from "../../queryClient";

const ProductItem = ({ id, title, imageUrl, price, createdAt }: Product) => {
  const { mutate: addCart } = useMutation((id: string) =>
    cartAddFetcher(ADD_CART, { id })
  );

  return (
    <ItemCard>
      <Link to={`/products/${id}`}>
        <Typography variant="h6">{title}</Typography>
        <ItemImage src={imageUrl} />
        <Typography>{price}</Typography>
        <Typography>{createdAt}</Typography>
      </Link>
      <AddButton variant="contained" onClick={() => addCart(id)}>
        담기
      </AddButton>
    </ItemCard>
  );
};

export default ProductItem;

const ItemCard = styled(Card)(() => ({
  width: "300px",
  marginTop: "24px",
}));

const ItemImage = styled("img")(() => ({
  width: "100%",
}));

const AddButton = styled(Button)(() => ({
  width: "90%",
  margin: "16px 0",
}));
