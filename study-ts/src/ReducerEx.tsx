import React from "react";
import { useExDispatch, useExState } from "./ContextEx";

function ReducerEx() {

  const state = useExState();
  const dispatch = useExDispatch();

  const setCount = () => dispatch({ type: 'SET_COUNT', count: 5 });
  const setText = () => dispatch({ type:'SET_TEXT', text: 'byebye' });
  const setColor = () => dispatch({ type: 'SET_COLOR', color: 'red'});
  const toggleGood = () => dispatch({ type: 'TOGGLE_GOOD'});

  return (
    <div>
      <div>count: </div>{state.count}
      <div>text: </div>{state.text}
      <div>color: </div>{state.color}
      <div>isGood: </div>{state.isGood ? 'true': 'false'}
      <div>
        <button onClick={setCount}>SET_COUNT</button>
        <button onClick={setText}>SET_TEXT</button>
        <button onClick={setColor}>SET_COLOR</button>
        <button onClick={toggleGood}>TOGGLE_GOOD</button>
      </div>
    </div>
  )
}

export default ReducerEx;