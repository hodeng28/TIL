// 액션타입 생성

const SET_DIFF = 'Counter/SET_DIFF';
const INCREASE = 'Counter/INCREASE';
const DECREASE = 'Counter/DECREASE';

// 액션 생성함수 만들기
// export 키워드로 내보내기

export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 초기 상태 선언
const initialState = {
  number: 0,
  diff: 1
};

// 리듀서 선언
// export default 로 내보내기

export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff
      }
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff
      }
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff
      }
    default:
      return state;
  }
}

