import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Counter from "../components/Counter";
import { decrease, increase, setDiff } from "../modules/counter";

function CounterContainer({ number, diff, increase, decrease, setDiff }) {
  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={increase}
      onDecrease={decrease}
      onSetDiff={setDiff}
    />
  );
}

const mapStateToProps = (state) => ({
  number: state.counter.number,
  diff: state.counter.diff,
});

// const mapDispatchToProps = dispatch => ({
//   onIncrease: () => dispatch(increase()),
//   onDecrease: () => dispatch(decrease()),
//   onSetDiff: () => dispatch(setDiff(diff)),
// });
// const mapDispatchToProps = {
//       increase,
//       decrease,      // mapStateToProps 가 함수타입이 아닌 객체 타입이라면..
//       setDiff,       // bindActionCreateors가 커넥트 내부에서 일어나짐 -> 바로쓸수있음
// };

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      increase,
      decrease,
      setDiff,
    },
    dispatch
  );

// const enhance = connect(mapStateToProps, mapDispatchToProps)
// export default enhance(CounterContainer);
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
