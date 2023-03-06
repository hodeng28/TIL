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
import { Product } from "../../types";

const ProductItem = ({
  id,
  title,
  image,
  price,
  category,
  rating,
}: Product) => (
  <Card>
    <Link to={`/products/${id}`}>
      <Typography variant="h6">{title}</Typography>
      <p>{category}</p>
      <ItemImage src={image} />
      <span>{price}</span>
      <span>{rating.count}</span>
      <span>{rating.rate}</span>
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
