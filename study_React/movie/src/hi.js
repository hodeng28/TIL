/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import { NavLink } from 'react-router-dom';
// import MainRouter from './Router/MainRouter';
// import classNames from 'classnames/bind';
// import style from './App.css';
// import header from './Component/header';
import moviesApi from './api';

const Hi = () => {
  const initialState = {
    data: "",
  };

  const [state, setState] = useState(initialState);

  console.log(state);

  const onClick = async (e) => {
    switch (e) {
      case "getUpComing":
        const getUpComing = await moviesApi.getUpcoming();
        setState({
          data: getUpComing
        });
        break;
      case "getPopular":
        const getPopular = await moviesApi.getPopular();
        setState({
          data: getPopular
        });
        break;
      case "getNowPlaying":
        const getNowPlaying = await moviesApi.getNowPlaying();
        setState({
          data: getNowPlaying
        });
        break;
      default:
        console.log(state);
    };
  }

  const inputEnter = async (i, e) => {
    if (e.keyCode !== 13) return;
    console.log(e.target.value);
    switch (i) {
      case "searchMovies":
        const searchMovies = await moviesApi.searchMovies(e.target.value);
        setState({
          data: searchMovies
        });
        break;
      case "getMoive":
        const getMoive = await moviesApi.getMovie(e.target.value);
        setState({
          data: getMoive
        });
        break;
      default:
        console.log(state);
    }
  };

  return (
    <div>
      <button onClick={() => {
        onClick("getUpComing");
      }} >최신영화</button>
      <button onClick={() => {
        onClick("getPopular");
      }}>인기순</button>
      <button onClick={() => {
        onClick("getNowPlaying");
      }}>현재상영작</button>
      <input onKeyUp={(e) => {
        inputEnter("searchMovies", e)
      }} type="text" placeholder="검색" />
      <input onKeyUp={(e) => {
        inputEnter("getMoive", e)
      }} type="text" placeholder="정보" />


    </div>
  );
}

export default Hi;