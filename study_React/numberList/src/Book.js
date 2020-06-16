/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useReducer } from "react";
import List from "./List";

const reducer = (state, action) => {

}


const Book = () => {
  const date = new Date();
  const [bookState, setBookState] = useState([
    {
      _id: date.getTime(),
      name: "정호영",
      number: "01036300189"
    },
  ]);

  const [inputState, setInputState] = useState({
    name: "",
    number: "",
  });

  useEffect(() => {
    console.log('부모 컴퍼넌트 화면에 나타남');
    console.log('bookState');
    return () => {
      console.log('부모 컴퍼넌트 화면에서 사라짐');
    };
  }, [bookState]);

  const changeInput = (e) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const deleteNumber = (_id) => {
    setBookState(bookState.filter((i) => i._id !== _id));
  };

  const addPhone = () => {
    const newNumber = {
      _id: date.getTime(),
      name: inputState.name,
      number: inputState.number,
    };
    setBookState(bookState.concat(newNumber));
  }

  return (
    <>
      <div>
        <input type="text" name="name" onChange={changeInput} />
        <input type="text" name="number" onChange={changeInput} />
        <button onClick={addPhone}>번호 추가</button>
      </div>
      <List number={bookState} deleteNumber={deleteNumber} />
    </>
  );
};

export default Book;