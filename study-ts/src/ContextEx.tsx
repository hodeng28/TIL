import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type Color = 'red' | 'white' | 'blue';

type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
}

type Action = 
 | { type: 'SET_COUNT'; count: number }
 | { type: 'SET_TEXT'; text: string }
 | { type: 'SET_COLOR'; color: Color }
 | { type: 'TOGGLE_GOOD' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      };
    case 'SET_COLOR':
      return {
        ...state,
        color: action.color
      };
    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood
      }
    default:
      throw new Error('unhandled action type');
  }
}

type ExDispatch = Dispatch<Action>

const ExStateContext = createContext<State | null>(null);
const ExDispatchContext = createContext<ExDispatch | null>(null);

type ExProviderProps = {
  children: React.ReactNode;
}

export function ExProvider({ children }: ExProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: 'hi',
    color: 'red',
    isGood: true
  });

  return (
    <ExStateContext.Provider value={state}>
      <ExDispatchContext.Provider value={dispatch}>
        {children}
      </ExDispatchContext.Provider>
    </ExStateContext.Provider>
  );
}

export function useExState() {
    
  const state = useContext(ExStateContext);
  if(!state) throw new Error('cannot find ExProvider');
  return state;
}

export function useExDispatch() {
  const dispatch = useContext(ExDispatchContext);
  if(!dispatch) throw new Error('cannot find ExProvider');
  return dispatch;
}