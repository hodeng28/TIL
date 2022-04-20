import { useRecoilState } from "recoil";
import todoListState from "../Recoil/Recoil";

const TodoItem = ({ item }) => {
    const [todoList, setTodoList] = useRecoilState(todoListState);

    const editItemText = ({ target: { value } }) => {
        const newList = todoList.map((listItem) => 
            listItem.id === item.id ? { ...listItem, text: value } : listItem
        );
        setTodoList(newList);
    };

    const toggleItemCompletion = ({ target: { value } }) => {
        const newList = todoList.map((listItem) => 
            listItem.id === item.id ? { ...listItem, isComplete: !item.isComplete } : listItem
        );
        setTodoList(newList);
    };

    const deleteItem = () => {
        const newList = todoList.filter((listItem) => listItem.id !== item.id);

        setTodoList(newList);
    };

    return (
        <>
            <input type='text' value={item.text} onChange={editItemText} />
            <input
                type='checkbox'
                checked={item.isComplete}
                onChange={toggleItemCompletion}
            />
            <button onClick={deleteItem}>X</button>
        </>
    );
};

export default TodoItem;

