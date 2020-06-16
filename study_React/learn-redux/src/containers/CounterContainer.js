// 컨테이너 컴포넌트 - 리덕스의 상태를 조회하거나 
// 액션을 디스패치 할 수 있는 컴포넌트를 의미한다.
// HTML tag를 사용하지 않고 다른 프리젠테이션 컴포넌터를 불러서 사용

// useSelector는 리덕스 스토어의 상태를 조회하는 hook
import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';


function CounterContainer({ number, diff, Increase, Decrease, SetDiff }) {
  return (
    <Counter
      // 상태,
      number={number}
      diff={diff}
      // 액션들을 디스패치하는 함수들을 props로 넣음
      onIncrease={Increase}
      onDecrease={Decrease}
      onSetDiff={SetDiff}
    />
  );
}
// 리덕스 스토어의 상태를 조회해서 어떤 것들을 props로 넣어줄지 정의.
// 현재 리덕스 상태를 파라미터로 받아온다.
const mapStateToProps = state => ({
  number: state.counter.number,
  diff: state.counter.diff
});

// 액션을 디스패치하는 함수를 만들어서 props로 넣어준다.
// dispatch를 파라미터로 받아온다.
const mapDispatchToProps = {
  increase,
  decrease,
  setDiff
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);
