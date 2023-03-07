import {
  Box,
  Card,
  CardMedia,
  List,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../graphql/products";

const ProductItem = ({ id, title, imageUrl, price, createdAt }: Product) => (
  <Card>
    <Link to={`/products/${id}`}>
      <Typography variant="h6">{title}</Typography>
      <ItemImage src={imageUrl} />
      <span>{price}</span>
      <span>{createdAt}</span>
    </Link>
  </Card>
);

export default ProductItem;

const ItemList = styled(List)(() => ({
  width: "300px",
}));

const ItemImage = styled("img")(() => ({
  width: "100%",
}));
