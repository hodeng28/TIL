import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Stack, Button } from "@mui/material";
import NavBar from "./NavBar";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.main}>
        <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </main>
    </div>
  );
};

export default Home;
