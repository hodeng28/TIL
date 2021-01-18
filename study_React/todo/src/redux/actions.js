// 액션타입

export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_FILTER = "SET_FILTER";

// 액션 생성함수

let nextTodoId = 0;

export const addTodo = (text) => ({
  type: ADD_TODO,
  todo: {
    id: ++nextTodoId,
    text,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  filter,
});
