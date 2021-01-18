/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const List = ({ number, deleteNumber }) => {
  useEffect(() => {
    console.log('자식 컴포넌트가 화면에 나타남');
    return () => {
      console.log('자식 컴포넌트가 화면에 사라짐');
    };
  }, []);

  return (
    <ul>
      {number.map((v, index) => {
        return (
          <li key={index}>
            {v.name + " : " + v.number}
            <button onClick={() => deleteNumber(v._id)}>X</button>
          </li>
        );
      })}
    </ul>
  );
}
export default List;