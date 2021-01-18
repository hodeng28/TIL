/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useReducer, useEffect } from 'react';
import { moviesApi } from '../api';
import style from './getPopular.css'
import classNames from 'classnames/bind';

const st = classNames.bind(style);

const reducer = (popularState, action) => {
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

const getPopular = () => {
  const [popularState, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: false,
  });

  const fetchPopular = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await moviesApi.getPopular();
      dispatch({ type: 'SUCCESS', data: response.results });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  const { data: movies, error, loading } = popularState;
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

export default getPopular;