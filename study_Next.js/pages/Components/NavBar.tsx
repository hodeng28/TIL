import Link from "next/link";
import { useRouter } from "next/router";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { BackIconButton } from "./Button/BackButton";

const NavBar = () => {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1, height: "56px" }}>
      <AppBar position="fixed">
        <Toolbar>
          {router.pathname === "/movies/[id]" ? (
            <BackIconButton
              onClickBack={() => {
                router.back();
              }}
            />
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movies
            </Typography>
          )}
          <Box
            sx={{
              width: "25%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link href="/">
              <a className={router.pathname === "/" ? "active" : ""}>Home</a>
            </Link>
            <Link href="/about">
              <a className={router.pathname === "/about" ? "active" : ""}>
                page
              </a>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
