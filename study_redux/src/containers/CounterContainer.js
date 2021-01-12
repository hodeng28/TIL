import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { decrease, increase, setDiff } from "../modules/counter";

function CounterContainer() {
  const { number, diff } = useSelector((state) => ({
    // 상태를 조회하는 hook
    number: state.counter.number,
    diff: state.counter.diff,
  }));

  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
