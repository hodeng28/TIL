import { Box, styled, Typography } from "@mui/material";
import { Product } from "../../graphql/products";

const ProductDetail = ({
  item: { title, imageUrl, price, description, createdAt },
}: {
  item: Product;
}) => (
  <Box>
    <Typography variant="h6">{title}</Typography>
    <p>{description}</p>
    <ItemImage src={imageUrl} />
    <span>{price}</span>
    <span>{createdAt}</span>
  </Box>
);

export default ProductDetail;

const ItemImage = styled("img")(() => ({
  width: "100%",
}));
