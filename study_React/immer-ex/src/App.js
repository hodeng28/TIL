import React, { useCallback, useRef, useState } from "react";
import produce from "immer";

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  // input 수정
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm(
        produce((draft) => {
          draft[name] = value;
        })
      );
    },
    [form]
  );

  // form 등록

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      setData(
        produce((draft) => {
          draft.array.push(info);
        })
      );

      setForm({
        name: "",
        username: "",
      });
      nextId.current += 1;
    },
    [data, form.name, form.username]
  );

  // 항목 삭제

  const onRemove = useCallback(
    (id) => {
      setData(
        produce((draft) => {
          draft.array.splice(
            draft.array.findIndex((info) => info.id === id),
            1
          );
        })
      );
    },
    [data]
  );
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.name} ({info.username})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
