import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);
  // 제너릭 생략 가능 값(0)으로 유추
  const onIncrease = () => setCount(count + 1);
  const deIncrease = () => setCount(count - 1);

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