import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  const { title, poster_path, overview } = router.query;

  return (
    <>
      <Box sx={{ padding: "0 16px" }}>{title || <h4>loading</h4>}</Box>
      <Image
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        width={500}
        height={400}
        alt={`${title} poster`}
      />
      <div>{overview}</div>
    </>
  );
};
export default Details;
