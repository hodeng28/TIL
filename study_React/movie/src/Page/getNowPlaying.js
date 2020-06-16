import { useEffect } from "react";
import { moviesApi } from "../api";


const reducer = (playingState, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        data: action.data,
        error: null,
        loading: false,
      };
    case "ERROR":
      return {
        data: null,
        error: action.error,
        loading: false,
      };
    case "LOADING":
      return {
        data: null,
        error: null,
        loading: true,
      };
    default:
      throw new Error("ERROR");
  }
};

const getNowPlaying = () => {

  const fetchPlaying = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await moviesApi.getNowPlaying();
      dispatch({ type: 'SUCCESS', data: response.results });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchPlaying();
  }, [])

  const { data: movies, error, loading } = playingState;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>ERROR</div>;
  if (!movies) return <div>NO DATA</div>;

  return (
    <div>
      <ul className={st('movieSector')}>
        {movies.map((movie, order) => {
          return (
            <li className={st('moiveList')}>
              <img
                className={st('moivePoster')}
                alt=""
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              />
            </li>
          );
        })};
      </ul>
    </div>
  );
};

export default getNowPlaying;