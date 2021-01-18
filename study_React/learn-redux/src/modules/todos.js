// 액션 타입 선언

const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';


// 액션 생성함수 선언

let nextId = 1;

export const addTodo = text => ({
  type: ADD_TODO,
  todo: {
    id: nextId++,
    text
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});

// 초기상태 선언
// 리듀서의 초기상태는 꼭 객체타입일 필요가없다.
// 배열도 가능 원시타입 가능.

const initialState = [

];


export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo)
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.id
            ? { ...todo, done: !todo.done }
            : todo
      )
    default:
      return state;
  }
}
