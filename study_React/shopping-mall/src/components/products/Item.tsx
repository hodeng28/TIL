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
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemSelector } from "../../atoms/cart";
import { Product } from "../../graphql/products";

const ProductItem = ({ id, title, imageUrl, price, createdAt }: Product) => {
  const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));

  const handleClickAddToCart = () => setCartAmount((prev) => (prev || 0) + 1);

  return (
    <Card>
      <Link to={`/products/${id}`}>
        <Typography variant="h6">{title}</Typography>
        <ItemImage src={imageUrl} />
        <span>{price}</span>
        <span>{createdAt}</span>
      </Link>
      <Button onClick={handleClickAddToCart}>담기</Button>
      <span>{cartAmount || 0}</span>
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
