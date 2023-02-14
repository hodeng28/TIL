import Seo from "./Components/Seo";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

interface IMovieProps {
  id: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  genre_ids: [number];
}

const Home = ({ results }: InferGetServerSidePropsType<GetServerSideProps>) => {
  const router = useRouter();
  const movieDatas = ({ id, title }: { id: number; title: string }) => {
    router.push({
      pathname: `/movies/${id}`,
      query: {
        title,
      },
    });
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie: IMovieProps) => (
        <div
          key={movie.id}
          onClick={() =>
            movieDatas({ id: movie.id, title: movie.original_title })
          }
          className="movie"
        >
          <Image
            alt="이미지"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={40}
            height={40}
          />
          <h4>{movie.original_title}</h4>
          <Link
            href={{
              pathname: `/movies/${movie.id}`,
              query: {
                title: movie.original_title,
              },
            }}
            as={`/movies/${movie.id}`}
          >
            <a>{movie.original_title}</a>
          </Link>
        </div>
      ))}
      {/* <style>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style> */}
    </div>
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
