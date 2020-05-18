/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import List from "./List";
import { bookApi } from "./api";

const initialState = {
  inputState: {
    name: "",
    phone: "",
  },
  bookState: [
    {
      _id: 0,
      name: "김건희",
      phone: "01080775647",
    },
  ],
};

const Book = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    message: null,
  });

  useEffect(() => {
    //프로미스를 반환하므로 함수 형태로 준비를 시킨 후
    const bookFunc = async () => {
      try {
        setLoading(true);
        setState(initialState);
        let bookData = await bookApi.getBook();
        console.log(bookData);
        if (bookData.status === 200) {
          setState({
            inputState: state.inputState,
            bookState: bookData.data,
          });
        } else {
          setError({
            state: true,
            message: bookData.statusText,
          });
        }
      } catch (error) {
        setError({
          state: true,
          message: error.message,
        });
      }
      setLoading(false);
    };
    //하단에서 실행시켜줍니다!
    bookFunc();
  }, []);



  const changeInput = (e) => {
    const { name, value } = e.target;
    setState({
      inputState: {
        ...state.inputState,
        [name]: value,
      },
      bookState: state.bookState,
    });
  };
  const addPhone = () => {
    const date = new Date();
    const newPhone = {
      id: date.getTime(),
      name: state.inputState.name,
      phone: state.inputState.phone,
    };
    setState({
      inputState: state.initialState,
      bookState: state.bookState.concat(newPhone),
    });
  };
  const deletePhone = (id) => {
    setState({
      inputState: state.inputState,
      bookState: state.bookState.filter((b) => b.id !== id),
    });
  };
  const book = state.bookState;
  return (
    <div>
      <h1>무한반복 전화번호부 with API</h1>
      이름:
      <input type="text" name="name" onChange={changeInput} />
      번호:
      <input type="text" name="phone" onChange={changeInput} />
      <button onClick={addPhone}>저장</button>
      <div>
        <List book={book} deletePhone={deletePhone} />
      </div>
    </div>
  );
};

export default Book;