import type { NextPage } from "next";
import Seo from "./Components/Seo";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Seo title="Home" />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
