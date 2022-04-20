import { useRecoilValue } from "recoil"
import todoListState from "../Recoil/Recoil";
import TodoItem from "./TodoItem";
import TodoItemCreator from "./TodoItemCreator";

const TodoList = () => {
    const todoList = useRecoilValue(todoListState);

    return (
        <>  
            <TodoItemCreator />
            {todoList.map((todo) => (
                <TodoItem key={todo.id} item={todo} />
            ))}
        </>
    )
}

export default TodoList;