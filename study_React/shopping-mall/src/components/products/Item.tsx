import { Box, Stack, styled, Typography } from "@mui/material";
import { Product } from "../../types";

const ProductItem = ({ title, image, price, category, rating }: Product) => (
  <ItemBox>
    <Typography variant="h6">{title}</Typography>
    <p>{category}</p>
    <ItemImage src={image} />
    <span>{price}</span>
    <span>{rating.count}</span>
    <span>{rating.rate}</span>
  </ItemBox>
);

export default ProductItem;

const ItemBox = styled(Box)(() => ({
  width: "300px",
}));

const ItemImage = styled("img")(() => ({
  width: "100%",
}));
