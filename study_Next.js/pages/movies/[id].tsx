import Image from "next/image";
import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  console.log(router);
  const { title, poster_path, overview } = router.query;
  return (
    <>
      <div>{title || <h4>loading</h4>}</div>
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
