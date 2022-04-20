import { useState } from "react";
import { useSetRecoilState } from "recoil";
import todoListState from "../Recoil/Recoil";

const TodoItemCreator = () => {

    const [inputValue, setInputValue] = useState('');
    const setTodoList = useSetRecoilState(todoListState);

    const addTodo = () => {
        setTodoList((oldTodoList) => {
            const id = oldTodoList.length
                ? oldTodoList[oldTodoList.length - 1].id + 1 : 0;
            return ([
                ...oldTodoList,
                {
                id,
                text: inputValue,
                isComplete: false,
                },
            ]);
        });
        setInputValue('');
      };
    

    const onChange = ({ target: {value}}) => {
        setInputValue(value);
    };

    return (
        <>
            <input type="text" value={inputValue} onChange={onChange} />
            <button onClick={addTodo}>추가</button>
        </>
    );
};

export default TodoItemCreator;