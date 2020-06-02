// 컨테이너 컴포넌트 - 리덕스의 상태를 조회하거나 
// 액션을 디스패치 할 수 있는 컴포넌트를 의미한다.
// HTML tag를 사용하지 않고 다른 프리젠테이션 컴포넌터를 불러서 사용

// useSelector는 리덕스 스토어의 상태를 조회하는 hook
import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';


function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 hook
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }),
    shallowEqual
    // shaollowEqual은 react-redux 내장함수.
    // 객체 안의 가장 겉에 있는 값들을 모두 비교
    // 내부 값 비교 X
  );

  const dispatch = useDispatch();
  // useDispatch는 리덕스 스토어의 dispatch를 함수에서 사용할수있게 해주는 hook
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  )
};

export default CounterContainer;

