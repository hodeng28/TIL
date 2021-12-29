import React, { useReducer } from 'react';

type Action = { type: "INCREASE"} | { type: "DECREASE"};

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
  
    default:
      throw new Error('unhandled action type');
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  // 제너릭 생략 가능 값(0)으로 유추
  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const deIncrease = () => dispatch({ type: 'DECREASE' });

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={deIncrease}>-1</button>
      </div>
    </div>
  )
}

export default Counter;