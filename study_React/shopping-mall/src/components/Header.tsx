import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  const navItems = [
    { pathname: "/", title: "홈" },
    { pathname: "/products", title: "상품목록" },
    { pathname: "/cart", title: "장바구니" },
  ];

  return (
    <NavList>
      {navItems.map((item) => (
        <Link to={item.pathname} key={item.title}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </NavList>
  );
};

export default Header;

const NavList = styled(List)(() => ({
  display: "flex",
  background: "#e5e5e5",
}));
