import styles from "../styles/Home.module.css";
import { Stack, Button } from "@mui/material";

const About = () => {
  return (
    <div className={styles.container}>
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

export default About;
