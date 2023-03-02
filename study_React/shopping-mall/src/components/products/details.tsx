import { Box, styled, Typography } from "@mui/material";
import { Product } from "../../types";

const ProductDetail = ({
  item: { title, category, image, price, description, rating },
}: {
  item: Product;
}) => (
  <Box>
    <Typography variant="h6">{title}</Typography>
    <p>{category}</p>
    <p>{description}</p>
    <ItemImage src={image} />
    <span>{price}</span>
    <span>{rating.count}</span>
    <span>{rating.rate}</span>
  </Box>
);

export default ProductDetail;

const ItemImage = styled("img")(() => ({
  width: "100%",
}));
