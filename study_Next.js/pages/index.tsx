import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box } from "@mui/material";

interface IMovieProps {
  id: number;
  backdrop_path?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  title?: string;
  vote_average?: number;
  genre_ids?: [number];
}

const Home = ({ results }: InferGetServerSidePropsType<GetServerSideProps>) => {
  const router = useRouter();
  const movieDatas = ({ id, title, overview, poster_path }: IMovieProps) => {
    router.push({
      pathname: `/movies/${id}`,
      query: {
        title,
        overview,
        poster_path,
      },
    });
  };

  return (
    <Box sx={{ padding: "0 16px" }}>
      {results?.map((movie: IMovieProps) => (
        <div
          key={movie.id}
          onClick={() =>
            movieDatas({
              id: movie.id,
              title: movie.original_title,
              overview: movie.overview,
              poster_path: movie.poster_path,
            })
          }
          className="movie"
        >
          <Image
            alt="이미지"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={500}
            height={500}
          />
          <h4>{movie.original_title}</h4>
          <Link
            href={{
              pathname: `/movies/${movie.id}`,
              query: {
                title: movie.original_title,
                overview: movie.overview,
                poster_path: movie.poster_path,
              },
            }}
            as={`/movies/${movie.id}`}
          >
            <a>{movie.original_title}</a>
          </Link>
        </div>
      ))}
    </Box>
  );
};

// server side rendering
export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();

  return {
    props: {
      results,
    },
  };
}

export default Home;
